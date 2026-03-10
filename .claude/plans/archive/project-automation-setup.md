# Project Board Automation - Setup Guide

## File Location

`.github/workflows/project-automation.yml`

## Quick Setup Checklist

### 1. Create Required Labels

Ensure these labels exist in your GitHub repository settings:

**Core Labels:**

- `in-progress` (green) - Issue currently being worked on
- `ready-for-review` (blue) - PR ready for code review
- `merged` (purple) - Merged pull requests

**File-Based Labels:**

- `javascript` (yellow) - JavaScript changes
- `css` (purple) - CSS/styling changes
- `html` (red) - HTML markup changes
- `testing` (orange) - Test file changes
- `dependencies` (gray) - Package/dependency changes
- `ci/cd` (black) - CI/CD workflow changes
- `github` (blue) - GitHub-specific changes
- `documentation` (green) - Doc changes
- `content` (pink) - Content changes (labyrinth, akademia)

### 2. Configure PR Body Keywords

The workflow auto-closes issues when PRs use these keywords in the description:

- `Fixes #123`
- `Closes #456`
- `Resolves #789`

Example PR description:

```markdown
## Description

This PR implements feature XYZ.

## Related Issues

Fixes #54
Resolves #123
```

### 3. Permissions

The workflow requires these permissions (configured in workflow file):

- `issues: write` - Modify issue labels and add comments
- `pull-requests: write` - Modify PR labels
- `contents: read` - Read changed files in PRs

### 4. GitHub Secrets

No secrets required - uses built-in `GITHUB_TOKEN` automatically provided by GitHub.

## How It Works

### Workflow Triggers

| Event            | Condition             | Action                                   |
| ---------------- | --------------------- | ---------------------------------------- |
| Issue Assigned   | User assigns issue    | Add `in-progress` label                  |
| Issue Unassigned | User removes assignee | Remove `in-progress` label               |
| PR Opened        | New PR created        | Analyze files, add labels                |
| PR Updated       | Code pushed to PR     | Check draft status, update labels        |
| PR Merged        | PR merged to main     | Close related issues, add `merged` label |

## Testing the Workflow

### Test Issue Assignment

1. Create a test issue
2. Assign it to a user
3. Verify `in-progress` label appears

### Test PR Auto-Labeling

1. Create a PR that modifies JavaScript files
2. Verify `javascript` label appears
3. Test with other file types

### Test Auto-Close

1. Create an issue (#999 for example)
2. Create a PR with "Fixes #999" in description
3. Merge the PR
4. Verify the issue closes automatically

## Monitoring Execution

**View Workflow Runs:**

1. Go to repository → Actions tab
2. Select "Project Board Automation"
3. Click recent run to see detailed logs

**Debug Failed Jobs:**

- Check step-by-step output in the action log
- Look for permission errors or API failures
- Verify labels exist before workflow runs

## Customization Examples

### Add New File-Based Label

Edit `.github/workflows/project-automation.yml` in the `label-pr-by-changes` job:

```javascript
// Add this to the label detection section:
if (filePaths.some(f => f.match(/^docs\/api\//))) {
  labelsToAdd.push('api-docs');
}
```

### Modify Issue Closure Keywords

In `close-issues-on-pr-merge` job, update the regex:

```javascript
// Default: Fixes|Closes|Resolves
const issueRegex = /(?:Fixes|Closes|Resolves|Related)\s+#(\d+)/gi;
```

### Add Auto-Assignment Rules

Create a new job to automatically assign issues based on labels:

```yaml
auto-assign-issues:
  name: Auto-Assign Issues
  runs-on: ubuntu-latest
  if: github.event_name == 'issues' && github.event.action == 'opened'
  steps:
    - name: Auto-assign based on label
      uses: actions/github-script@v7
      with:
        script: |
          // Custom assignment logic here
```

## Limitations & Notes

1. **GitHub Project Boards (Classic):** This workflow uses labels and issue states, not the legacy project board API
2. **GitHub Project (Beta/v2):** For full kanban board automation, would need additional setup
3. **Draft PRs:** Draft status is honored - workflow won't process as ready until marked ready
4. **No Org-Level Automation:** Workflow is repository-specific, not organization-wide
5. **Rate Limits:** GitHub Actions has API rate limits (~6,000 requests/hour)

## Troubleshooting

**Issue: Labels not being added**

- Check label exists in repository
- Verify workflow permissions in Settings → Actions → General
- Check workflow syntax is valid (YAML indentation)

**Issue: Issues not closing on PR merge**

- Verify PR description contains exact keywords: "Fixes", "Closes", or "Resolves"
- Ensure issue number matches: "Fixes #123" (not "Fix issue 123")
- Check issue is currently open

**Issue: Workflow never runs**

- Verify branch matches trigger (`main` or `master`)
- Check workflow file is in `.github/workflows/`
- Verify file extension is `.yml` or `.yaml`

## Related Files

- `/Users/4jp/.claude/plans/project-automation-workflow.md` - Detailed feature breakdown
