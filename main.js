const statsDefaults = {
  personalProjects: '5회',
  teamProjects: '2회',
  certificates: '2개',
  clubActivity: '멋사',
}

const statsStorageKey = 'portfolioStats'
const projectsStorageKey = 'projects'
const teamProjectsStorageKey = 'teamProjects'
const hideDefaultTeamProjectKey = 'hideDefaultTeamProject'
const statsEditorPanel = document.querySelector('#statsEditorPanel')
const toggleStatsEditor = document.querySelector('#toggleStatsEditor')
const resetStats = document.querySelector('#resetStats')
const statInputs = document.querySelectorAll('[data-stat-input]')
const recentActivityBody = document.querySelector('#recentActivityBody')
const recentMoreBtn = document.querySelector('#recentMoreBtn')

let stats = loadStats()
let openedRecentIndex = null
let recentVisibleCount = 4

const defaultTeamRecentProjects = [
  {
    required: true,
    id: 'mid-security-guide',
    label: 'MIDTERM SECURITY GUIDE',
    source: '웹프로그래밍 중간 팀플',
    title: 'Security Guide 보안 안내 웹사이트',
    desc:
      '피싱, 랜섬웨어, 개인정보 유출 등 일상생활에서 접할 수 있는 보안 위협과 예방법을 소개한 중간 팀 프로젝트입니다.',
    image: 'img/teammain.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    deploy: 'https://project-security-guide.vercel.app/',
    github: 'https://github.com/Solalise',
    goal:
      '사용자가 생활 속 사이버 보안 위협을 쉽게 이해하고, 피싱이나 개인정보 유출 같은 문제를 예방할 수 있도록 정보를 전달하는 것이 목표입니다.',
    content:
      '메인 홈, 보안 이슈, OWASP Top 10, 보안 수칙, 팀 소개 페이지로 구성하여 보안 정보를 카드와 리스트 중심으로 정리했습니다.',
    direction:
      'HTML과 CSS를 중심으로 페이지 구조, 카드형 레이아웃, 반응형 화면, 기본 페이지 연결을 구현했습니다.',
    members: [],
    review:
      '중간 프로젝트에서는 보안 정보를 읽고 이해할 수 있는 안내형 웹사이트를 제작했습니다.',
    gallery: ['img/teammain.png', 'img/rule.png', 'img/issue.png', 'img/owasp.png'],
  },
  {
    required: true,
    id: 'final-security-guide',
    label: 'FINAL SECURITY GUIDE',
    source: '웹프로그래밍 기말 팀플',
    title: 'Security Guide 보안 학습 플랫폼',
    desc:
      '중간 프로젝트의 보안 안내 웹사이트를 확장하여 보안 이슈 뉴스, OWASP 취약점 실습, 실생활 보안 위험 진단, 보안 퀴즈와 보안 습관 체크리스트를 추가한 기말 팀 프로젝트입니다.',
    image: 'img/security-final-practice.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    deploy: 'https://web-programming-team-project-alpha.vercel.app/index.html',
    github: 'https://github.com/Solalise',
    goal:
      '중간 프로젝트의 안내형 사이트를 사용자가 직접 테스트하고 결과를 확인할 수 있는 인터랙티브 보안 학습 플랫폼으로 업그레이드하는 것이 목표입니다.',
    content:
      '보안 뉴스 자동 반영, OWASP 취약점 실습, 비밀번호·피싱 메일·URL 위험 진단, 보안 퀴즈, 개인 보안 습관 체크리스트, 팀 소개와 문의 기능을 추가했습니다.',
    direction:
      'JavaScript를 활용해 입력값 분석, 버튼 클릭 이벤트, 체크리스트 점수 계산, 뉴스/영상 필터링, 상세 정보 표시 기능을 구현했습니다.',
    members: [],
    review:
      '기말 프로젝트에서는 JavaScript로 기능을 확장해 사용자가 직접 반응을 확인할 수 있는 보안 학습 플랫폼으로 발전시켰습니다.',
    gallery: [
      'img/security-final-practice.png',
      'img/security-final-news.png',
      'img/security-final-issues.png',
      'img/security-final-risk.png',
      'img/security-final-diagnosis.png',
      'img/security-final-quiz.png',
      'img/security-final-checklist.png',
    ],
  },
]

function loadStats() {
  try {
    return {
      ...statsDefaults,
      ...JSON.parse(localStorage.getItem(statsStorageKey)),
    }
  } catch (error) {
    localStorage.removeItem(statsStorageKey)
    return statsDefaults
  }
}

function saveStats() {
  localStorage.setItem(statsStorageKey, JSON.stringify(stats))
}

function renderStats() {
  Object.keys(statsDefaults).forEach(function (key) {
    const valueElement = document.querySelector(`[data-stat-value="${key}"]`)
    const inputElement = document.querySelector(`[data-stat-input="${key}"]`)

    if (valueElement) {
      valueElement.innerText = stats[key]
    }

    if (inputElement) {
      inputElement.value = stats[key]
    }
  })
}

function loadProjects() {
  try {
    return JSON.parse(localStorage.getItem(projectsStorageKey)) || []
  } catch (error) {
    return []
  }
}

function loadTeamProjects() {
  try {
    const savedProjects = JSON.parse(localStorage.getItem(teamProjectsStorageKey)) || []
    const baseProjects =
      localStorage.getItem(hideDefaultTeamProjectKey) === 'true' ? [] : defaultTeamRecentProjects

    return baseProjects.concat(savedProjects).map(function (project) {
      return {
        ...project,
        source: project.source || (project.required ? '웹프로그래밍 팀플' : '팀 프로젝트'),
      }
    })
  } catch (error) {
    return localStorage.getItem(hideDefaultTeamProjectKey) === 'true'
      ? []
      : defaultTeamRecentProjects
  }
}

function getStatusClass(status) {
  if (status === '설계중' || status === '구상중' || status === '예정') {
    return 'planned'
  }

  if (status === '진행중' || status === '진행 중') {
    return 'progress'
  }

  return 'done'
}

function makeRecentActivities() {
  const projects = loadProjects()
  const teamProjects = loadTeamProjects()

  const projectActivities =
    projects.length > 0
      ? projects
          .map(function (project, index) {
            return { ...project, projectIndex: index, recentOrder: index + 1 }
          })
          .map(function (project) {
            const status = project.status || '완료'

            return {
              type: '개인 프로젝트',
              title: project.title,
              desc: project.desc,
              image: project.image,
              tags: project.tags || [],
              projectIndex: project.projectIndex,
              recentOrder: project.createdAt || project.recentOrder,
              status: status,
              statusClass: project.statusClass || getStatusClass(status),
              href: 'project.html',
              linkText: 'Project 보기',
            }
          })
      : []

  const teamActivities = teamProjects
    .map(function (project, index) {
      return { ...project, teamProjectIndex: index, recentOrder: projects.length + index + 1 }
    })
    .map(function (project) {
      return {
        type: '팀 프로젝트',
        title: project.title,
        desc: project.desc,
        image: project.image,
        tags: project.tags || [],
        teamProjectIndex: project.teamProjectIndex,
        teamProjectData: project,
        recentOrder: project.createdAt || project.recentOrder,
        status: '완료',
        statusClass: 'done',
        href: 'team.html',
        linkText: 'Team 보기',
      }
    })

  return projectActivities.concat(teamActivities).sort(function (a, b) {
    return Number(b.recentOrder || 0) - Number(a.recentOrder || 0)
  })
}

function renderRecentActivities() {
  if (!recentActivityBody) {
    return
  }

  recentActivityBody.innerHTML = ''

  const activities = makeRecentActivities()
  const visibleActivities = activities.slice(0, recentVisibleCount)

  visibleActivities.forEach(function (activity, index) {
    const row = document.createElement('tr')
    const typeCell = document.createElement('td')
    const titleCell = document.createElement('td')
    const statusCell = document.createElement('td')
    const linkCell = document.createElement('td')
    const status = document.createElement('span')
    const actionButton = document.createElement('button')

    typeCell.innerText = activity.type
    titleCell.innerText = activity.title
    status.className = `status ${activity.statusClass}`
    status.innerText = activity.status
    actionButton.className = 'recent-toggle-btn'
    actionButton.type = 'button'
    actionButton.dataset.recentIndex = index
    actionButton.innerText =
      openedRecentIndex === index ? '접기' : activity.linkText

    statusCell.appendChild(status)
    linkCell.appendChild(actionButton)
    row.appendChild(typeCell)
    row.appendChild(titleCell)
    row.appendChild(statusCell)
    row.appendChild(linkCell)
    recentActivityBody.appendChild(row)

    if (openedRecentIndex === index) {
      recentActivityBody.appendChild(makeRecentDetailRow(activity))
    }
  })

  renderRecentMoreButton(activities.length)
}

function renderRecentMoreButton(totalCount) {
  if (!recentMoreBtn) {
    return
  }

  recentMoreBtn.style.display = 'inline-flex'
  recentMoreBtn.innerText = '더보기'
}

function makeRecentDetailRow(activity) {
  const detailRow = document.createElement('tr')
  const detailCell = document.createElement('td')
  const detailBox = document.createElement('div')
  const image = document.createElement('img')
  const content = document.createElement('div')
  const title = document.createElement('h3')
  const desc = document.createElement('p')
  const tags = document.createElement('div')
  const detailButton = document.createElement('button')

  detailRow.className = 'recent-detail-row'
  detailCell.colSpan = 4
  detailBox.className = 'recent-detail-box'
  image.src = activity.image || 'img/commingsoon.png'
  image.alt = activity.title
  content.className = 'recent-detail-content'
  title.innerText = activity.title
  desc.innerText = activity.desc || '프로젝트 상세 설명이 준비 중입니다.'
  tags.className = 'recent-detail-tags'
  detailButton.className = 'recent-detail-btn'
  detailButton.type = 'button'
  detailButton.dataset.href = activity.href
  detailButton.innerText =
    Number.isInteger(activity.projectIndex) || Number.isInteger(activity.teamProjectIndex)
      ? '프로젝트 더 자세히 보기'
      : '자세히 보기'

  if (Number.isInteger(activity.projectIndex)) {
    detailButton.dataset.projectIndex = activity.projectIndex
  }

  if (Number.isInteger(activity.teamProjectIndex)) {
    detailButton.dataset.teamProjectIndex = activity.teamProjectIndex
    detailButton.dataset.teamProjectData = JSON.stringify(activity.teamProjectData)
  }

  ;(activity.tags || []).slice(0, 4).forEach(function (tag) {
    const span = document.createElement('span')
    span.innerText = tag
    tags.appendChild(span)
  })

  content.appendChild(title)
  content.appendChild(desc)

  if (tags.children.length > 0) {
    content.appendChild(tags)
  }

  content.appendChild(detailButton)
  detailBox.appendChild(image)
  detailBox.appendChild(content)
  detailCell.appendChild(detailBox)
  detailRow.appendChild(detailCell)

  return detailRow
}

function updateStat(key, value) {
  stats[key] = value.trim() || statsDefaults[key]
  saveStats()
  renderStats()
}

toggleStatsEditor.addEventListener('click', function () {
  statsEditorPanel.classList.toggle('show')
})

statInputs.forEach(function (input) {
  input.addEventListener('input', function () {
    updateStat(input.dataset.statInput, input.value)
  })
})

resetStats.addEventListener('click', function () {
  stats = { ...statsDefaults }
  saveStats()
  renderStats()
})

if (recentActivityBody) {
  recentActivityBody.addEventListener('click', function (event) {
    const toggleButton = event.target.closest('.recent-toggle-btn')
    const detailButton = event.target.closest('.recent-detail-btn')

    if (toggleButton) {
      const recentIndex = Number(toggleButton.dataset.recentIndex)
      openedRecentIndex = openedRecentIndex === recentIndex ? null : recentIndex
      renderRecentActivities()
    }

    if (detailButton) {
      const projectIndex = Number(detailButton.dataset.projectIndex)
      const teamProjectIndex = Number(detailButton.dataset.teamProjectIndex)

      if (Number.isInteger(projectIndex)) {
        localStorage.setItem('selectedProjectIndex', projectIndex)
        location.href = 'project-detail.html'
      } else if (Number.isInteger(teamProjectIndex)) {
        localStorage.setItem('selectedTeamProjectIndex', teamProjectIndex)
        localStorage.setItem('selectedTeamProjectData', detailButton.dataset.teamProjectData)
        location.href = 'team-detail.html'
      } else {
        location.href = detailButton.dataset.href || 'project.html'
      }
    }
  })
}

if (recentMoreBtn) {
  recentMoreBtn.addEventListener('click', function () {
    recentVisibleCount += 4
    openedRecentIndex = null
    renderRecentActivities()
  })
}

window.addEventListener('storage', function (event) {
  if (
    event.key === projectsStorageKey ||
    event.key === teamProjectsStorageKey ||
    event.key === hideDefaultTeamProjectKey
  ) {
    openedRecentIndex = null
    recentVisibleCount = 4
    renderRecentActivities()
  }

  if (event.key === statsStorageKey) {
    stats = loadStats()
    renderStats()
  }
})

renderStats()
renderRecentActivities()
