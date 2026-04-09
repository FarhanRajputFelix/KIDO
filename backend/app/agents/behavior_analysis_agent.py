from sqlalchemy.orm import Session
from app.agents.base import BaseAgent
from app.models.child import ChildProfile
from app.schemas.agents import AgentResponse, AgentType, AgentAnalysis, AgentDecision, AgentAction
from app.ai.behavior_analysis import analyze_behavior
from datetime import datetime

class BehaviorAnalysisAgent(BaseAgent):
    def __init__(self):
        super().__init__(AgentType.BEHAVIOR_ANALYSIS)

    async def analyze(self, child: ChildProfile, db: Session, context: dict = None) -> AgentAnalysis:
        analysis = analyze_behavior(child, db)
        
        findings = [f"Activity trend: {analysis.activity_trend}"]
        findings.extend(analysis.stress_indicators)
        
        # Advanced: Check for "Sudden drop" or "Stress indicators"
        stress_level = 0.0
        if analysis.stress_indicators:
            stress_level = len(analysis.stress_indicators) / 5.0 # Max 1.0
            
        return AgentAnalysis(
            child_id=child.id,
            agent_type=self.agent_type,
            findings=findings,
            score=stress_level
        )

    async def decide(self, analysis: AgentAnalysis, context: dict = None) -> AgentDecision:
        actions = []
        confidence = 0.75
        
        if analysis.score > 0.4:
            reasoning = "High stress or low engagement indicators detected in behavioral patterns."
            actions.append(AgentAction(
                action_type="trigger_smart_alert",
                description="Send a smart alert to parent regarding potential learning stress.",
                payload={"indicators": analysis.findings}
            ))
            actions.append(AgentAction(
                action_type="adapt_content_flow",
                description="Adapt content flow to include more breaks or therapeutic activities.",
            ))
        else:
            reasoning = "Behavioral patterns are within normal range."
            
        return AgentDecision(
            agent_type=self.agent_type,
            confidence=confidence,
            reasoning=reasoning,
            actions=actions
        )

    async def act(self, decision: AgentDecision, db: Session, context: dict = None) -> None:
        for action in decision.actions:
            print(f"[BehaviorAnalysisAgent] Taking action: {action.description}")
