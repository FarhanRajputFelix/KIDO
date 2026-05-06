from abc import ABC, abstractmethod
from sqlalchemy.orm import Session
from app.models.child import ChildProfile
from app.schemas.agents import AgentResponse, AgentType
from typing import Any

class BaseAgent(ABC):
    def __init__(self, agent_type: AgentType):
        self.agent_type = agent_type

    @abstractmethod
    async def analyze(self, child: ChildProfile, db: Session, context: dict = None) -> Any:
        """Analyze the current state of the child/environment."""
        pass

    @abstractmethod
    async def decide(self, analysis: Any, context: dict = None) -> Any:
        """Make a decision based on the analysis."""
        pass

    @abstractmethod
    async def act(self, decision: Any, db: Session, context: dict = None) -> Any:
        """Take actions based on the decision."""
        pass

    async def run(self, child: ChildProfile, db: Session, context: dict = None) -> AgentResponse:
        """Run the full agent cycle: Analyze -> Decide -> Act."""
        analysis = await self.analyze(child, db, context)
        decision = await self.decide(analysis, context)
        await self.act(decision, db, context)
        
        return AgentResponse(
            analysis=analysis,
            decision=decision
        )
