from sqlalchemy.orm import Session
from app.agents.base import BaseAgent
from app.models.child import ChildProfile
from app.schemas.agents import AgentResponse, AgentType, AgentAnalysis, AgentDecision, AgentAction
from app.ai.behavior_analysis import analyze_behavior
from datetime import datetime

class EngagementAgent(BaseAgent):
    def __init__(self):
        super().__init__(AgentType.ENGAGEMENT)

    async def analyze(self, child: ChildProfile, db: Session, context: dict = None) -> AgentAnalysis:
        analysis = analyze_behavior(child, db)
        
        findings = [f"Engagement score: {analysis.engagement_score}"]
        findings.extend(analysis.stress_indicators)
        findings.append(f"Trend: {analysis.activity_trend}")
        
        return AgentAnalysis(
            child_id=child.id,
            agent_type=self.agent_type,
            findings=findings,
            score=analysis.engagement_score
        )

    async def decide(self, analysis: AgentAnalysis, context: dict = None) -> AgentDecision:
        actions = []
        confidence = 0.8
        
        if analysis.score < 50:
            reasoning = "Low engagement detected. Recommending content switch or difficulty adjustment."
            actions.append(AgentAction(
                action_type="switch_format",
                description="Switch content format from video to game to boost engagement.",
                payload={"target_format": "game"}
            ))
            actions.append(AgentAction(
                action_type="adjust_difficulty",
                description="Lower quiz difficulty temporarily.",
                payload={"adjustment": -1}
            ))
        else:
            reasoning = "Engagement is healthy. Maintaining current flow."
            
        return AgentDecision(
            agent_type=self.agent_type,
            confidence=confidence,
            reasoning=reasoning,
            actions=actions
        )

    async def act(self, decision: AgentDecision, db: Session, context: dict = None) -> None:
        for action in decision.actions:
            print(f"[EngagementAgent] Taking action: {action.description}")
