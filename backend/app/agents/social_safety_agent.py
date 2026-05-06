from sqlalchemy.orm import Session
from app.agents.base import BaseAgent
from app.models.child import ChildProfile
from app.models.friend import FriendRequest
from app.schemas.agents import AgentResponse, AgentType, AgentAnalysis, AgentDecision, AgentAction
from datetime import datetime

class SocialSafetyAgent(BaseAgent):
    def __init__(self):
        super().__init__(AgentType.SOCIAL_SAFETY)

    async def analyze(self, child: ChildProfile, db: Session, context: dict = None) -> AgentAnalysis:
        # Check for unapproved friend requests or requests from unknown categories
        pending_requests = db.query(FriendRequest).filter(
            FriendRequest.receiver_id == child.id,
            FriendRequest.parent_approved == False
        ).all()
        
        findings = [f"Pending friend requests: {len(pending_requests)}"]
        
        # Simple safety check: More than 5 unapproved requests might be suspicious
        suspicious = False
        if len(pending_requests) > 5:
            findings.append("⚠️ High volume of incoming friend requests detected")
            suspicious = True
            
        return AgentAnalysis(
            child_id=child.id,
            agent_type=self.agent_type,
            findings=findings,
            score=10.0 if suspicious else 0.0 # Hazard score
        )

    async def decide(self, analysis: AgentAnalysis, context: dict = None) -> AgentDecision:
        actions = []
        confidence = 0.9
        
        if analysis.score > 5.0:
            reasoning = "Suspicious activity detected: unusually high friend request volume."
            actions.append(AgentAction(
                action_type="notify_parent",
                description="Notify parent about high volume of friend requests.",
                payload={"level": "warning"}
            ))
            actions.append(AgentAction(
                action_type="restrict_social",
                description="Temporarily restrict new friend requests until parent review.",
            ))
        else:
            reasoning = "Social interactions appear safe."
            
        return AgentDecision(
            agent_type=self.agent_type,
            confidence=confidence,
            reasoning=reasoning,
            actions=actions
        )

    async def act(self, decision: AgentDecision, db: Session, context: dict = None) -> None:
        for action in decision.actions:
            print(f"[SocialSafetyAgent] Taking action: {action.description}")
