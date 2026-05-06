from sqlalchemy.orm import Session
from app.agents.base import BaseAgent
from app.models.child import ChildProfile
from app.schemas.agents import AgentResponse, AgentType, AgentAnalysis, AgentDecision, AgentAction
from app.ai.personalization import generate_learning_path
from datetime import datetime

class LearningAgent(BaseAgent):
    def __init__(self):
        super().__init__(AgentType.LEARNING)

    async def analyze(self, child: ChildProfile, db: Session, context: dict = None) -> AgentAnalysis:
        # Use existing logic to find weak/strong areas
        path = generate_learning_path(child, db)
        
        findings = [f"Weak areas: {', '.join(path.weak_areas)}"]
        findings.append(f"Strong areas: {', '.join(path.strong_areas)}")
        
        return AgentAnalysis(
            child_id=child.id,
            agent_type=self.agent_type,
            findings=findings,
            score=child.avg_quiz_score
        )

    async def decide(self, analysis: AgentAnalysis, context: dict = None) -> AgentDecision:
        actions = []
        reasoning = "Based on weak areas identified in learning history."
        
        # Action: Generate a new learning plan
        actions.append(AgentAction(
            action_type="generate_plan",
            description="Generate a new personalized learning plan for the day.",
            payload={"priority": "high"}
        ))
        
        return AgentDecision(
            agent_type=self.agent_type,
            confidence=0.95,
            reasoning=reasoning,
            actions=actions
        )

    async def act(self, decision: AgentDecision, db: Session, context: dict = None) -> None:
        # In a real system, this might trigger a notification or update a DB field
        # For now, we log the action
        for action in decision.actions:
            print(f"[LearningAgent] Taking action: {action.description}")
