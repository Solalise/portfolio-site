const teamProjectGrid = document.querySelector('#teamProjectGrid')
const teamModal = document.querySelector('#teamModal')
const openTeamModal = document.querySelector('#openTeamModal')
const closeTeamModal = document.querySelector('#closeTeamModal')
const addTeamProjectBtn = document.querySelector('#addTeamProjectBtn')

const defaultTeamProjects = [
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
    members: [
      {
        name: '박형진',
        role: '팀장 / OWASP Top 10',
        image: 'img/member-hyeongjin.jpg',
        tasks: ['프로젝트 전체 설계 및 구현', 'OWASP Top 10 페이지 제작', '최종 결과물 취합 및 배포'],
        leader: true,
      },
      {
        name: '최보원',
        role: 'Main Page / UI Detail',
        image: 'img/member-bowon.png',
        tasks: ['메인 홈 페이지 설계 및 구현', '팀 소개 페이지 설계 및 구현', '공통 CSS 디자인 담당'],
      },
      {
        name: '박시우',
        role: 'Security Guide / Contact',
        image: 'img/member-siwoo.png',
        tasks: ['보안 수칙 페이지 제작', '자료 조사 및 정리', '문서 작성 및 발표'],
      },
      {
        name: '박지민',
        role: 'Security Issue Page',
        image: 'img/member-jimin.jpg',
        tasks: ['보안 이슈 페이지 제작', '페이지 색상 디자인', '다크 모드 구현'],
      },
    ],
    review:
      '중간 프로젝트에서는 보안 정보를 읽고 이해할 수 있는 안내형 웹사이트를 제작했습니다. 페이지별 자료를 정리하고, 카드형 UI와 공통 디자인을 맞춰 기본적인 보안 정보 전달에 집중했습니다.',
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
    image: 'img/teammain.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    deploy: 'https://web-programming-team-project-alpha.vercel.app/index.html',
    github: 'https://github.com/Solalise',
    goal:
      '중간 프로젝트의 안내형 사이트를 사용자가 직접 테스트하고 결과를 확인할 수 있는 인터랙티브 보안 학습 플랫폼으로 업그레이드하는 것이 목표입니다.',
    content:
      '보안 뉴스 자동 반영, OWASP 취약점 실습, 비밀번호·피싱 메일·URL 위험 진단, 보안 퀴즈, 개인 보안 습관 체크리스트, 팀 소개와 문의 기능을 추가했습니다.',
    direction:
      'JavaScript를 활용해 입력값 분석, 버튼 클릭 이벤트, 체크리스트 점수 계산, 뉴스/영상 필터링, 상세 정보 표시처럼 사용자가 직접 반응을 확인하는 기능을 구현했습니다.',
    members: [
      {
        name: '박형진',
        role: '팀장 / 인터랙티브 보안 실습',
        image: 'img/member-hyeongjin.jpg',
        tasks: ['취약 코드와 보안 조치 코드 비교 구현', 'OWASP A05 XSS 및 A01 접근 통제 실습 구현', 'OWASP A07 무차별 대입 실습 구현'],
        leader: true,
      },
      {
        name: '박시우',
        role: '보안 수칙 / 보안 퀴즈',
        image: 'img/member-siwoo.png',
        tasks: ['보안 수칙 카드 인터랙션 기능 구현', '카드 클릭 시 추가 정보 표시 기능 개발', '보안 퀴즈 정답 확인 및 결과 출력 구현'],
      },
      {
        name: '박지민',
        role: '보안 이슈 / 트렌드',
        image: 'img/member-jimin.jpg',
        tasks: ['보안 기사 실시간 반영 및 필터 구현', '보안 트렌드 영상 실시간 반영 및 필터 구현', '더보기 버튼 클릭 시 추가 정보 표시 구현'],
      },
      {
        name: '최보원',
        role: '위험 진단 / 담당 페이지 JS',
        image: 'img/member-bowon.png',
        tasks: ['위험 진단 페이지 설계 및 구현', '팀 소개 및 문의 페이지 JS 추가와 내용 변경', '메인 홈페이지 수정 및 JS 추가'],
      },
    ],
    review:
      '기말 프로젝트에서는 JavaScript로 기능을 확장했습니다. 보안 이슈 페이지에는 기사 필터와 더보기 기능, 최신 보안 트렌드 영상 영역을 추가했고, 보안 실습 페이지에는 취약한 코드와 안전한 코드를 비교하는 OWASP 실습 탭을 구현했습니다. 위험 진단 페이지에서는 비밀번호·피싱 메일·URL 입력값을 분석해 위험 신호와 이유를 출력하도록 만들었고, 보안 퀴즈와 개인 보안 습관 체크리스트에서는 정답 확인, 결과 출력, 체크율 계산 기능을 추가했습니다.',
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

let teamProjects = loadTeamProjects()
let selectedTeamIndex = null

function loadTeamProjects() {
  try {
    const savedProjects = JSON.parse(localStorage.getItem('teamProjects')) || []

    return defaultTeamProjects.concat(savedProjects).map(function (project) {
      return {
        ...project,
        source: project.source || (project.required ? '웹프로그래밍 팀플' : '팀 프로젝트'),
      }
    })
  } catch (error) {
    localStorage.removeItem('teamProjects')
    return defaultTeamProjects
  }
}

function saveTeamProjects() {
  const editableProjects = teamProjects.filter(function (project) {
    return !project.required
  })

  localStorage.setItem('teamProjects', JSON.stringify(editableProjects))
}

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function splitCommaList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function renderTeamCards() {
  teamProjectGrid.innerHTML = ''

  teamProjects.forEach(function (project, index) {
    const card = document.createElement('article')
    card.className = 'team-project-card'
    if (project.required) {
      card.id = project.id || `team-project-${index}`
    }
    const safeTags = (project.tags || [])
      .map((tag) => `<span>${escapeHTML(tag)}</span>`)
      .join('')
    const deleteButton = project.required
      ? ''
      : `<button class="project-btn sub" type="button" data-action="delete" data-index="${index}">삭제</button>`

    card.innerHTML = `
      <img src="${project.image}" alt="${escapeHTML(project.title)}" class="team-project-thumb">
      <div class="team-project-content">
        <div class="team-project-meta">
          <span class="project-category">${escapeHTML(project.label || 'TEAM PROJECT')}</span>
          <span class="status progress">${escapeHTML(project.source || '팀 프로젝트')}</span>
        </div>
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.desc)}</p>
        <div class="project-tags">
          ${safeTags}
        </div>
        <div class="team-project-actions">
          <button class="project-btn detail" type="button" data-action="detail" data-index="${index}">
            상세 보기
          </button>
          ${deleteButton}
        </div>
      </div>
    `

    teamProjectGrid.appendChild(card)
  })
}

function renderSelectedTeamProject() {
  renderTeamCards()
}

function openTeamDetail(index) {
  localStorage.setItem('selectedTeamProjectIndex', index)
  localStorage.setItem('selectedTeamProjectData', JSON.stringify(teamProjects[index]))
  location.href = 'team-detail.html'
}

function makeTeamCardDetail(project) {
  return `
    <div class="team-card-detail">
      <div class="team-card-detail-top">
        <img src="${project.image}" alt="${escapeHTML(project.title)}">
        <div>
          <span class="team-label">${escapeHTML(project.label || 'TEAM PROJECT')}</span>
          <h2>${escapeHTML(project.title)}</h2>
          <p>${escapeHTML(project.desc)}</p>
          <div class="team-tags">
            ${project.tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join('')}
          </div>
          <div class="team-btns">
            <a href="${project.deploy || '#'}" class="btn primary" target="_blank">
              ${project.deploy ? '배포 사이트' : '배포 준비중'}
            </a>
            <a href="${project.github || '#'}" class="btn" target="_blank">
              ${project.github ? 'GitHub' : 'GitHub 준비중'}
            </a>
          </div>
        </div>
      </div>

      <div class="team-card-info-grid">
        <div>
          <h3>프로젝트 목표</h3>
          <p>${escapeHTML(project.goal)}</p>
        </div>
        <div>
          <h3>주요 콘텐츠</h3>
          <p>${escapeHTML(project.content)}</p>
        </div>
        <div>
          <h3>제작 방향</h3>
          <p>${escapeHTML(project.direction)}</p>
        </div>
      </div>

      <div class="team-card-section-title">
        <h3>팀원 역할</h3>
      </div>

      <div class="team-card-member-grid">
        ${project.members
          .map(
            (member) => `
              <article class="team-card-member ${member.leader ? 'leader' : ''}">
                ${member.image ? `<img src="${escapeHTML(member.image)}" alt="${escapeHTML(member.name)} 프로필 이미지" class="member-avatar">` : ''}
                <strong>${member.leader ? '👑 ' : ''}${escapeHTML(member.name)}</strong>
                <p>${escapeHTML(member.role)}</p>
                <ul>
                  ${member.tasks.map((task) => `<li>${escapeHTML(task)}</li>`).join('')}
                </ul>
              </article>
            `,
          )
          .join('')}
      </div>

      <div class="team-card-review">
        <h3>추가된 기능</h3>
        <p>${escapeHTML(project.review)}</p>
      </div>

      <div class="team-card-gallery">
        ${project.gallery
          .map((image, index) => `<img src="${image}" alt="작업 화면 ${index + 1}">`)
          .join('')}
      </div>
    </div>
  `
}

function renderTags(tags) {
  const tagBox = document.querySelector('.team-tags')
  tagBox.innerHTML = ''

  tags.forEach(function (tag) {
    const span = document.createElement('span')
    span.innerText = tag
    tagBox.appendChild(span)
  })
}

function renderLinks(deploy, github) {
  const buttons = document.querySelector('.team-btns')
  buttons.innerHTML = `
    <a href="${deploy || '#'}" class="btn primary" target="_blank">
      ${deploy ? '배포 사이트' : '배포 준비중'}
    </a>
    <a href="${github || '#'}" target="_blank" class="btn">
      ${github ? 'GitHub' : 'GitHub 준비중'}
    </a>
  `
}

function renderInfoBoxes(project) {
  const infoBoxes = document.querySelectorAll('.team-info-box p')
  infoBoxes[0].innerText = project.goal
  infoBoxes[1].innerText = project.content
  infoBoxes[2].innerText = project.direction
}

function renderMembers(members) {
  const memberGrid = document.querySelector('.member-grid')
  memberGrid.innerHTML = ''

  members.forEach(function (member) {
    const card = document.createElement('article')
    card.className = member.leader ? 'member-card leader' : 'member-card'
    card.innerHTML = `
      <div class="member-icon">
        ${
          member.image
            ? `<img src="${escapeHTML(member.image)}" alt="${escapeHTML(member.name)} 프로필 이미지">`
            : member.leader
              ? '👑'
              : '👤'
        }
      </div>
      <h3>${escapeHTML(member.name)}</h3>
      <p class="member-role">${escapeHTML(member.role)}</p>
      <ul>
        ${member.tasks.map((task) => `<li>${escapeHTML(task)}</li>`).join('')}
      </ul>
    `

    memberGrid.appendChild(card)
  })
}

function renderGallery(images) {
  const galleryGrid = document.querySelector('.gallery-grid')
  galleryGrid.innerHTML = ''

  images.forEach(function (image, index) {
    const img = document.createElement('img')
    img.src = image
    img.alt = `작업 화면 ${index + 1}`
    galleryGrid.appendChild(img)
  })
}

function addTeamProject(imageData) {
  const title = document.querySelector('#teamTitle').value.trim()
  const desc = document.querySelector('#teamDesc').value.trim()

  if (!title || !desc) {
    alert('팀 프로젝트 제목과 소개는 반드시 입력해주세요.')
    return
  }

  const newProject = {
    required: false,
    createdAt: Date.now(),
    label: document.querySelector('#teamLabel').value.trim() || 'TEAM PROJECT',
    source: document.querySelector('#teamSource').value.trim() || '팀 프로젝트',
    title: title,
    desc: desc,
    image: imageData,
    tags: splitCommaList(document.querySelector('#teamTags').value) || ['Team'],
    deploy: document.querySelector('#teamDeploy').value.trim(),
    github: document.querySelector('#teamGithub').value.trim(),
    goal: document.querySelector('#teamGoal').value.trim() || '팀 프로젝트 목표를 정리했습니다.',
    content: document.querySelector('#teamContent').value.trim() || '주요 콘텐츠를 정리했습니다.',
    direction: document.querySelector('#teamDirection').value.trim() || '제작 방향을 정리했습니다.',
    members: parseMembers(document.querySelector('#teamMembers').value),
    review: document.querySelector('#teamReview').value.trim() || '팀원들과 역할을 나누어 협업했습니다.',
    gallery: splitCommaList(document.querySelector('#teamGallery').value),
  }

  if (newProject.tags.length === 0) {
    newProject.tags = ['Team']
  }

  if (newProject.gallery.length === 0) {
    newProject.gallery = [imageData]
  }

  teamProjects.push(newProject)
  selectedTeamIndex = teamProjects.length - 1
  saveTeamProjects()
  clearTeamForm()
  teamModal.classList.remove('show')
  renderSelectedTeamProject()
}

function parseMembers(value) {
  const members = value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map(function (line, index) {
      const [name, role, tasks] = line.split('|').map((part) => part.trim())

      return {
        name: name || `팀원 ${index + 1}`,
        role: role || '역할 미정',
        tasks: tasks ? splitCommaList(tasks) : ['담당 작업 정리 예정'],
        leader: index === 0,
      }
    })

  return members.length > 0
    ? members
    : [
        {
          name: '팀원',
          role: '역할 정리 예정',
          tasks: ['팀 프로젝트 담당 작업 정리 예정'],
          leader: true,
        },
      ]
}

function clearTeamForm() {
  document
    .querySelectorAll('.project-modal-box input, .project-modal-box textarea')
    .forEach(function (input) {
      input.value = ''
    })
}

openTeamModal.addEventListener('click', function () {
  teamModal.classList.add('show')
})

closeTeamModal.addEventListener('click', function () {
  teamModal.classList.remove('show')
})

addTeamProjectBtn.addEventListener('click', function () {
  const file = document.querySelector('#teamImageFile').files[0]

  if (!file) {
    addTeamProject('img/commingsoon.png')
    return
  }

  const reader = new FileReader()
  reader.onload = function () {
    addTeamProject(reader.result)
  }
  reader.readAsDataURL(file)
})

teamProjectGrid.addEventListener('click', function (event) {
  const button = event.target.closest('button[data-action]')

  if (!button) {
    return
  }

  const index = Number(button.dataset.index)

  if (button.dataset.action === 'detail') {
    openTeamDetail(index)
  }

  if (button.dataset.action === 'delete') {
    if (!confirm('이 팀 프로젝트를 삭제할까요?')) {
      return
    }

    teamProjects.splice(index, 1)
    selectedTeamIndex = null
    saveTeamProjects()
    localStorage.removeItem('selectedTeamProjectIndex')
    localStorage.removeItem('selectedTeamProjectData')
    renderSelectedTeamProject()
  }
})

renderTeamCards()
renderSelectedTeamProject()
