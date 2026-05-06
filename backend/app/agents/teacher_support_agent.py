from sqlalchemy.orm import Session
from app.agents.base import BaseAgent
from app.models.child import ChildProfile
from app.schemas.agents import AgentResponse, AgentType, AgentAnalysis, AgentDecision, AgentAction
from datetime import datetime

class TeacherSupportAgent(BaseAgent):
    def __init__(self):
        super().__init__(AgentType.TEACHER_SUPPORT)

    async def analyze(self, child: ChildProfile, db: Session, context: dict = None) -> AgentAnalysis:
        findings = []
        struggling = False
        if child.avg_quiz_score < 50:
            findings.append(f"Student {child.full_name} is struggling with quizzes.")
            struggling = True
        
        return AgentAnalysis(
            child_id=child.id,
            agent_type=self.agent_type,
            findings=findings,
            score=1.0 if struggling else 0.0
        )

    async def decide(self, analysis: AgentAnalysis, context: dict = None) -> AgentDecision:
        actions = []
        if analysis.score > 0.5:
            actions.append(AgentAction(
                action_type="suggest_assignment",
                description="Auto-generate a foundation-level assignment for this student.",
                payload={"level": "easy"}
            ))
            
        return AgentDecision(
            agent_type=self.agent_type,
            confidence=0.85,
            reasoning="Performance indicators suggest additional support needed.",
            actions=actions
        )

    async def act(self, decision: AgentDecision, db: Session, context: dict = None) -> None:
        for action in decision.actions:
            print(f"[TeacherSupportAgent] Taking action: {action.description}")
