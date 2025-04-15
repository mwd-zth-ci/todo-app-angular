# Todo - Angular

Todo is an application to manage tasks in a simple, easy way where you'll put your Angular knowledge to the test.

## Installation

1. Fork this project into your personal space

1. Clone the repository from your personal space to your computer

1. Install dependencies using the command `npm install`

1. Check development environment using the command `ng serve`

---

## E2E Test Environment Installation

1. Install requirements for e2e tests using the command `npm run e2e:install`
1. Run e2e tests using the command `npm run e2e`

## Configuration

The project already comes with an initial configuration, which is the typical setup used in Angular projects. It's ready to start adding features.

```
├── README.md
├── angular.json
├── dist
├── e2e
├── karma.conf.js
├── node_modules
├── package-lock.json
├── package.json
├── playwright.config.ts
├── src
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## Todo Application Architecture

### 1. Core Layer (`src/app/core/`)

Contains the fundamental building blocks of the application.

#### Domain Models (`core/domain/models/`)

- `todo.model.ts`: Defines the Todo entity and DTOs
- `filter.model.ts`: Defines filter types for todo filtering

#### Application Services (`core/application/services/`)

- `todo.service.ts`: Main service handling todo operations
- Implements the business logic and orchestrates the flow

#### Use Cases (`core/application/use-cases/`)

- Contains business rules and application-specific logic
- Separates business rules from infrastructure concerns

### 2. Store Layer (NgRx) (`src/app/store/`)

Implements the state management.

#### State (`store/state/`)

- `todo.state.ts`: Defines the state interface and initial state

#### Actions (`store/actions/`)

- `todo.actions.ts`: Defines all possible actions in the application
- Includes actions for CRUD operations and filtering

#### Reducers (`store/reducers/`)

- `todo.reducer.ts`: Handles state changes based on actions
- Pure functions that return new state

#### Effects (`store/effects/`)

- `todo.effects.ts`: Handles side effects
- Manages async operations and action dispatching

#### Selectors (`store/selectors/`)

- Provides efficient state queries
- Memoized functions for state selection

### 3. Feature Layer (`src/app/features/`)

Contains feature-specific components.

#### Todo Feature (`features/todo/`)

##### Pages

- `todo-page/`: Main todo list page

##### Components

- `todo-list/`: List of todos
- `todo-item/`: Individual todo item

### 4. Shared Layer (`src/app/shared/`)

Contains reusable components and utilities.

#### Components (`shared/components/`)

- Reusable UI components
- Header, footer, etc.

### 5. Application Layer

Root level configuration and setup.

#### Routes (`app.routes.ts`)

- Defines application routing

#### Configuration (`app.config.ts`)

- Application-wide configuration
- Dependency injection setup

## Data Flow

1. **User Interaction** → Component
2. **Component** → Service
3. **Service** → Store (Action)
4. **Store** → Effect (if needed)
5. **Effect** → Service (if needed)
6. **Store** → Reducer
7. **Reducer** → State Update
8. **State** → Component (via Selectors)

## Key Design Patterns

### 1. Clean Architecture

- Clear separation of concerns
- Domain-driven design
- Dependency rule (inner layers don't know about outer layers)

### 2. CQRS Pattern

- Commands (actions) and Queries (selectors) separation
- Clear distinction between state modification and state reading

### 3. Repository Pattern

- Abstraction of data access
- Decoupling business logic from data access

### 4. Facade Pattern

- Service layer acting as a facade for complex operations
- Simplifies component interactions

## Technical Stack

- Angular (Standalone components)
- NgRx (State management)
- TypeScript
- Clean Architecture principles
- Feature-based organization
