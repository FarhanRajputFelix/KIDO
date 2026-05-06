from sqlalchemy.orm import Session
from app.agents.base import BaseAgent
from app.models.child import ChildProfile
from app.schemas.agents import AgentResponse, AgentType, AgentAnalysis, AgentDecision, AgentAction
from datetime import datetime

class ParentAssistantAgent(BaseAgent):
    def __init__(self):
        super().__init__(AgentType.PARENT_ASSISTANT)

    async def analyze(self, child: ChildProfile, db: Session, context: dict = None) -> AgentAnalysis:
        # Consolidate info for parent
        findings = [
            f"Child: {child.full_name}",
            f"Current Level: {child.level}",
            f"Streak: {child.streak_days} days"
        ]
        
        if child.avg_quiz_score < 70:
            findings.append("💡 Suggestion: Spend more time on quizzes to improve accuracy.")
            
        return AgentAnalysis(
            child_id=child.id,
            agent_type=self.agent_type,
            findings=findings,
            score=child.avg_quiz_score
        )

    async def decide(self, analysis: AgentAnalysis, context: dict = None) -> AgentDecision:
        actions = []
        
        # Action: Generate weekly report content
        actions.append(AgentAction(
            action_type="generate_report",
            description="Update the pending weekly activity report with new insights.",
            payload={"child_id": analysis.child_id}
        ))
        
        return AgentDecision(
            agent_type=self.agent_type,
            confidence=1.0,
            reasoning="Routine insight generation for parent dashboard.",
            actions=actions
        )

    async def act(self, decision: AgentDecision, db: Session, context: dict = None) -> None:
        for action in decision.actions:
            print(f"[ParentAssistantAgent] Taking action: {action.description}")
