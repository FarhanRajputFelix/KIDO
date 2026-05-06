# KIDO System Architecture

```mermaid
graph TD
    %% Define Styles
    classDef client fill:#6C63FF,stroke:#fff,stroke-width:2px,color:#fff;
    classDef backend fill:#4ECDC4,stroke:#fff,stroke-width:2px,color:#fff;
    classDef db fill:#FF6B6B,stroke:#fff,stroke-width:2px,color:#fff;
    classDef ai fill:#FFD700,stroke:#333,stroke-width:2px,color:#333;
    classDef service fill:#2D2D3F,stroke:#fff,stroke-width:2px,color:#fff;

    %% Client Layer
    subgraph Client Layer [Frontend - Flutter Mobile/Web]
        F_Child[Child App 🎮]:::client
        F_Parent[Parent Dashboard 👨‍👩‍👧]:::client
        F_Teacher[Teacher Panel 🏫]:::client
    end

    %% Security Gateway Layer
    subgraph API Gateway Layer
        API[FastAPI Gateway / JWT Auth]:::backend
    end

    %% Business Logic Layer
    subgraph Core Services [Backend Services - Python]
        S_Auth(Auth & RBAC Service):::backend
        S_Game(Gamification & XP Engine):::backend
        S_Social(Social & Friend Service):::backend
        S_Safety(Safety & Content Filter):::backend
        S_Content(Video & Lesson Service):::backend
    end

    %% AI Layer
    subgraph AI Engine [Intelligence Layer]
        AI_Path(Personalized Learning Paths):::ai
        AI_Behavior(Behavioral Stress Analysis):::ai
        LLM[OpenAI API Engine]:::ai
    end

    %% Database Layer
    subgraph Data Layer [Persistence]
        DB[(PostgreSQL 15)]:::db
        Redis[(Redis Cache)]:::db
        S3[(AWS S3 Storage)]:::db
    end

    %% Connections
    F_Child -->|REST/HTTP| API
    F_Parent -->|REST/HTTP| API
    F_Teacher -->|REST/HTTP| API

    API --> S_Auth
    API --> S_Game
    API --> S_Social
    API --> S_Safety
    API --> S_Content

    S_Game --> DB
    S_Social --> DB
    S_Content --> DB
    S_Auth --> DB

    S_Content --> S3
    S_Game --> Redis

    S_Game <--> AI_Path
    S_Safety <--> AI_Behavior
    AI_Path <--> LLM
    AI_Behavior <--> LLM
```

## System Components Explained

### 1. Client Layer (Flutter)
- **Child App:** Optimized for low latency interaction, heavy gamification loops, animations (Lottie/Canvas).
- **Parent Dashboard:** Analytical view with graphs for screen-time, detailed logs.
- **Teacher Panel:** Video upload queue, student metric tracking.

### 2. Core Backend (FastAPI)
- Uses asynchronous I/O to handle thousands of concurrent game clicks.
- JWT Role Based Access Control restricts routes so children cannot hit parent endpoints.
- **Safety Engine:** Runs middleware on every request checking timeout limits (Screen Time) before serving payloads.

### 3. AI Intelligence Layer
- Periodically scans user logs in the background.
- Employs behavioral heuristics mapping to adaptively adjust quiz difficulty.

### 4. Persistence Layer
- **PostgreSQL:** Primary relational database holding 16 interconnected normalized tables ensuring absolute consistency for financial/safety records.
- **Redis:** Volatile caching for Leaderboard ranking to avoid heavy DB scans, and tracking active sessions.
- **S3 Object Storage:** Scalable binary storage for streaming encrypted, ad-free educational video content.
