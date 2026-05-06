from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.core.security import get_current_user_with_role
from app.models.user import UserRole
from app.models.child import ChildProfile
from app.schemas.agents import AgentResponse, AgentType
from app.agents.orchestrator import AgentOrchestrator

router = APIRouter(prefix="/agents", tags=["Agentic AI"])
orchestrator = AgentOrchestrator()

@router.post("/run-all/{child_id}", response_model=List[AgentResponse])
async def run_all_agents(
    child_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user_with_role([UserRole.PARENT, UserRole.ADMIN]))
):
    """Run all primary agents for a child and return their decisions."""
    child = db.query(ChildProfile).filter(ChildProfile.id == child_id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child profile not found")
        
    return await orchestrator.run_all(child, db)

@router.post("/run/{agent_type}/{child_id}", response_model=AgentResponse)
async def run_specific_agent(
    agent_type: AgentType,
    child_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user_with_role([UserRole.PARENT, UserRole.TEACHER, UserRole.ADMIN]))
):
    """Run a specific agent for a child."""
    child = db.query(ChildProfile).filter(ChildProfile.id == child_id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child profile not found")
        
    try:
        return await orchestrator.run_specific(agent_type, child, db)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/event/{event_type}/{child_id}", response_model=List[AgentResponse])
async def handle_system_event(
    event_type: str,
    child_id: int,
    payload: dict = {},
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user_with_role([UserRole.ADMIN, UserRole.TEACHER, UserRole.PARENT, UserRole.CHILD]))
):
    """Distribute a system event to relevant agents."""
    child = db.query(ChildProfile).filter(ChildProfile.id == child_id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child profile not found")
        
    return await orchestrator.handle_event(event_type, child, db, payload)
