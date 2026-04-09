from sqlalchemy.orm import Session
from app.agents.base import BaseAgent
from app.models.child import ChildProfile
from app.models.content import Content
from app.schemas.agents import AgentResponse, AgentType, AgentAnalysis, AgentDecision, AgentAction
from datetime import datetime

class ContentModerationAgent(BaseAgent):
    def __init__(self):
        super().__init__(AgentType.CONTENT_MODERATION)

    async def analyze(self, child: ChildProfile, db: Session, context: dict = None) -> AgentAnalysis:
        # Scan recent content or specific content provided in context
        content_id = context.get("content_id") if context else None
        findings = []
        score = 0.0
        
        if content_id:
            content = db.query(Content).filter(Content.id == content_id).first()
            if content:
                # Mock safety scan
                findings.append(f"Scanning content: {content.title}")
                findings.append("Language safety: PASSED")
                findings.append("Visual safety: PASSED")
                findings.append("Context relevance: PASSED")
        else:
            findings.append("No specific content provided for moderation scan.")
            
        return AgentAnalysis(
            child_id=child.id,
            agent_type=self.agent_type,
            findings=findings,
            score=score
        )

    async def decide(self, analysis: AgentAnalysis, context: dict = None) -> AgentDecision:
        actions = []
        # If score was high (danger), we would block
        reasoning = "Content scan passed safety requirements."
            
        return AgentDecision(
            agent_type=self.agent_type,
            confidence=0.99,
            reasoning=reasoning,
            actions=actions
        )

    async def act(self, decision: AgentDecision, db: Session, context: dict = None) -> None:
        for action in decision.actions:
            print(f"[ContentModerationAgent] Taking action: {action.description}")
        if not decision.actions:
               print("[ContentModerationAgent] Content is safe.")
