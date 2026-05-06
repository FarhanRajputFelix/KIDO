from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.models.child import ChildProfile
from app.schemas.agents import AgentResponse, AgentType
from app.agents.learning_agent import LearningAgent
from app.agents.engagement_agent import EngagementAgent
from app.agents.social_safety_agent import SocialSafetyAgent
from app.agents.parent_assistant_agent import ParentAssistantAgent
from app.agents.teacher_support_agent import TeacherSupportAgent
from app.agents.content_moderation_agent import ContentModerationAgent
from app.agents.behavior_analysis_agent import BehaviorAnalysisAgent

class AgentOrchestrator:
    def __init__(self):
        self.agents = {
            AgentType.LEARNING: LearningAgent(),
            AgentType.ENGAGEMENT: EngagementAgent(),
            AgentType.SOCIAL_SAFETY: SocialSafetyAgent(),
            AgentType.PARENT_ASSISTANT: ParentAssistantAgent(),
            AgentType.TEACHER_SUPPORT: TeacherSupportAgent(),
            AgentType.CONTENT_MODERATION: ContentModerationAgent(),
            AgentType.BEHAVIOR_ANALYSIS: BehaviorAnalysisAgent()
        }

    async def run_all(self, child: ChildProfile, db: Session, context: dict = None) -> List[AgentResponse]:
        """Run all primary agents for a child."""
        responses = []
        for agent in self.agents.values():
            response = await agent.run(child, db, context)
            responses.append(response)
        return responses

    async def run_specific(self, agent_type: AgentType, child: ChildProfile, db: Session, context: dict = None) -> AgentResponse:
        """Run a specific agent."""
        agent = self.agents.get(agent_type)
        if not agent:
            raise ValueError(f"Agent {agent_type} not found.")
        return await agent.run(child, db, context)

    async def handle_event(self, event_type: str, child: ChildProfile, db: Session, payload: dict) -> List[AgentResponse]:
        """Handle specific system events by triggering relevant agents."""
        responses = []
        
        if event_type == "content_watched":
            # Trigger engagement and moderation
            responses.append(await self.run_specific(AgentType.ENGAGEMENT, child, db, payload))
            responses.append(await self.run_specific(AgentType.CONTENT_MODERATION, child, db, payload))
            
        elif event_type == "quiz_submitted":
            # Trigger learning and teacher support
            responses.append(await self.run_specific(AgentType.LEARNING, child, db, payload))
            responses.append(await self.run_specific(AgentType.TEACHER_SUPPORT, child, db, payload))
            
        elif event_type == "social_interaction":
            # Trigger social safety
            responses.append(await self.run_specific(AgentType.SOCIAL_SAFETY, child, db, payload))
            
        elif event_type == "daily_summary":
            # Trigger parent assistant and behavior analysis
            responses.append(await self.run_specific(AgentType.PARENT_ASSISTANT, child, db, payload))
            responses.append(await self.run_specific(AgentType.BEHAVIOR_ANALYSIS, child, db, payload))
            
        return responses
