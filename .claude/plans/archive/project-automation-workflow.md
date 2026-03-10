# Project Board Automation Workflow - Issue #54

## Summary

Created a comprehensive GitHub Actions workflow for automated project board management and issue/PR lifecycle tracking.

**File created:** `.github/workflows/project-automation.yml`

## Workflow Features

### 1. Issue Assignment Automation

- **Trigger:** Issue is assigned
- **Action:** Automatically adds `in-progress` label
- **Purpose:** Tracks which issues are actively being worked on
- **Job:** `move-assigned-issues`

### 2. Issue Unassignment Handling

- **Trigger:** Issue is unassigned
- **Action:** Removes `in-progress` label
- **Purpose:** Reflects that work has stopped
- **Job:** `remove-progress-on-unassign`

### 3. Auto-Close Issues on PR Merge

- **Trigger:** Pull request is merged (closed with merged status)
- **Action:** Closes related issues referenced in PR body (Fixes/Closes/Resolves keywords)
- **Details:**
  - Parses PR description for issue references using regex: `(?:Fixes|Closes|Resolves)\s+#(\d+)`
  - Closes each referenced issue
  - Adds automatic comment linking the PR
  - Handles errors gracefully (non-existent issues, already closed)
- **Job:** `close-issues-on-pr-merge`

### 4. PR Labeling by File Changes

- **Trigger:** Pull request is opened
- **Action:** Analyzes changed files and adds appropriate labels
- **Label Rules:**
  - `javascript` - Changes to `/js/` files
  - `css` - Changes to `/css/` files
  - `ci/cd` - Changes to `.github/workflows/`
  - `dependencies` - Changes to `package*.json` or `.config/`
  - `testing` - Changes to test files, `.spec.js`, `.test.js`
  - `github` - Changes to `.github/` directory
  - `html` - Changes to `.html` files
  - `documentation` - Changes to `.md` files or `README`/`CHANGELOG`
  - `content` - Changes to `/labyrinth/` or `/akademia/` directories
- **Job:** `label-pr-by-changes`

### 5. Ready for Review Management

- **Trigger:** PR updated (synchronize event) and not in draft mode
- **Action:** Adds `ready-for-review` label, removes `draft` label
- **Job:** `mark-ready-for-review`

### 6. Merged PR Tracking

- **Trigger:** PR is merged
- **Action:** Adds `merged` label, removes `ready-for-review` label
- **Purpose:** Clear audit trail of merged changes
- **Job:** `label-merged-pr`

## Technical Details

### Triggers

- `issues` - opened, assigned, unassigned events
- `pull_request` - opened, synchronize, closed events
- `pull_request_target` - closed event (for forks)

### Permissions

- `issues: write` - Create/update issue labels and comments
- `pull-requests: write` - Update PR labels
- `contents: read` - Read file changes in PRs

### Actions Used

- `actions/github-script@v7` - Execute JavaScript within GitHub API context
- `actions/checkout@v4` - Checkout code for file analysis

### Error Handling

- Try/catch blocks for missing labels (404 errors)
- Graceful handling of issues that don't exist or are already closed
- Validation before actions (checks for assignee, draft status)

## Labels Required

The following labels should exist in the repository for full functionality:

- `in-progress` - Active work
- `ready-for-review` - Ready for review
- `merged` - Merged PRs
- `javascript`, `css`, `html`, `testing`, `documentation`, `dependencies`, `ci/cd`, `github`, `content`

## Workflow Execution Flow

```
Issue Created/Assigned
  ↓
move-assigned-issues (if assigned)
  → Adds in-progress label

PR Created
  ↓
label-pr-by-changes
  → Analyzes file changes
  → Adds relevant labels

PR Updated
  ↓
mark-ready-for-review (if not draft)
  → Adds ready-for-review label

PR Merged
  ↓
close-issues-on-pr-merge
  → Closes referenced issues
  → Adds comments

label-merged-pr
  → Adds merged label
```

## Future Enhancements

- Add project v2 API integration for true kanban board management
- Implement milestone automation
- Add PR review requirements based on file changes
- Notify users when their issues are closed
- Support for draft status transitions
