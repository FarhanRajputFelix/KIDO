from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class AgentType(str, Enum):
    LEARNING = "learning"
    ENGAGEMENT = "engagement"
    SOCIAL_SAFETY = "social_safety"
    PARENT_ASSISTANT = "parent_assistant"
    TEACHER_SUPPORT = "teacher_support"
    CONTENT_MODERATION = "content_moderation"
    BEHAVIOR_ANALYSIS = "behavior_analysis"

class AgentAction(BaseModel):
    action_type: str
    target_id: Optional[str] = None
    payload: Dict[str, Any] = {}
    description: str

class AgentDecision(BaseModel):
    agent_type: AgentType
    confidence: float
    reasoning: str
    actions: List[AgentAction] = []
    metadata: Dict[str, Any] = {}

class AgentAnalysis(BaseModel):
    child_id: int
    agent_type: AgentType
    findings: List[str]
    score: Optional[float] = None
    analyzed_at: datetime = datetime.utcnow()

class AgentResponse(BaseModel):
    analysis: AgentAnalysis
    decision: AgentDecision
    timestamp: datetime = datetime.utcnow()
