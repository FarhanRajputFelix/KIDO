import pytest
from sqlalchemy.orm import Session
from app.models.child import ChildProfile
from app.agents.learning_agent import LearningAgent
from app.agents.engagement_agent import EngagementAgent
from app.agents.social_safety_agent import SocialSafetyAgent
from app.agents.orchestrator import AgentOrchestrator
from app.schemas.agents import AgentType

@pytest.mark.asyncio
async def test_learning_agent(db_session: Session):
    # Setup mock child
    child = ChildProfile(id=1, user_id=1, parent_id=2, username="testchild", age=10, avg_quiz_score=85, streak_days=5)
    agent = LearningAgent()
    
    response = await agent.run(child, db_session)
    assert response.analysis.agent_type == AgentType.LEARNING
    assert len(response.decision.actions) > 0
    assert "generate_plan" in [a.action_type for a in response.decision.actions]

@pytest.mark.asyncio
async def test_engagement_agent_low_score(db_session: Session):
    child = ChildProfile(id=1, user_id=1, parent_id=2, username="testchild", age=10, avg_quiz_score=30, games_played=10, streak_days=0)
    agent = EngagementAgent()
    
    response = await agent.run(child, db_session)
    assert response.analysis.agent_type == AgentType.ENGAGEMENT
    assert response.analysis.score < 50
    assert "switch_format" in [a.action_type for a in response.decision.actions]

@pytest.mark.asyncio
async def test_orchestrator_event_handling(db_session: Session):
    child = ChildProfile(id=1, user_id=1, parent_id=2, username="testchild", age=10, avg_quiz_score=70)
    orchestrator = AgentOrchestrator()
    
    responses = await orchestrator.handle_event("quiz_submitted", child, db_session, {"score": 90})
    agent_types = [r.analysis.agent_type for r in responses]
    assert AgentType.LEARNING in agent_types
    assert AgentType.TEACHER_SUPPORT in agent_types
