const fallbackTeamProject = {
  label: 'SECURITY GUIDE',
  source: '웹프로그래밍 팀플',
  title: '주요 사이버 보안 위협과 예방법 안내 웹사이트',
  desc:
    '일상생활에서 접할 수 있는 보안 위협을 소개하고, 사용자가 쉽게 확인할 수 있는 예방법을 정리한 보안 정보 안내 웹사이트입니다.',
  image: 'img/teammain.png',
  tags: ['HTML', 'CSS', 'JavaScript'],
  deploy: 'https://project-security-guide.vercel.app/',
  github: 'https://github.com/Solalise',
  goal:
    '사용자가 생활 속 사이버 보안 위협을 쉽게 이해하고, 피싱이나 개인정보 유출 같은 문제를 예방할 수 있도록 정보를 전달하는 것이 목표입니다.',
  content:
    '메인, 보안 이슈, OWASP Top 10, 보안 수칙, 팀 소개 페이지로 구성하여 정보 전달과 가독성을 높였습니다.',
  direction:
    '카드형 레이아웃, 이미지 요소, 반응형 화면을 활용해 HTML과 CSS 중심의 완성도 있는 사이트를 제작했습니다.',
  members: [
    {
      name: '박형진',
      role: '팀장 / OWASP Top 10',
      tasks: ['프로젝트 전체 설계 및 구현', 'OWASP Top 10 페이지 제작', '최종 결과물 취합 및 배포'],
      leader: true,
    },
    {
      name: '최보원',
      role: 'Main Page / UI Detail',
      tasks: ['메인 페이지 제작', '팀 소개 페이지 제작', '공통 CSS 디자인 담당'],
    },
    {
      name: '박시현',
      role: 'Security Guide / Contact',
      tasks: ['보안 수칙 페이지 제작', '자료 조사 및 정리', '문서 작성 및 발표'],
    },
    {
      name: '박지민',
      role: 'Security Issue Page',
      tasks: ['보안 이슈 페이지 제작', '페이지 색상 디자인', '다크 모드 구현'],
    },
  ],
  review:
    '각자 맡은 페이지를 중심으로 제작하고, 이후 공통 디자인 기준을 맞추며 하나의 사이트로 통합했습니다.',
  gallery: ['img/teammain.png', 'img/rule.png', 'img/issue.png', 'img/owasp.png'],
}

let teamProject = fallbackTeamProject

try {
  teamProject = JSON.parse(localStorage.getItem('selectedTeamProjectData')) || fallbackTeamProject
} catch (error) {
  localStorage.removeItem('selectedTeamProjectData')
}

function text(selector, value) {
  const element = document.querySelector(selector)
  if (element) {
    element.innerText = value || ''
  }
}

function attr(selector, name, value) {
  const element = document.querySelector(selector)
  if (element) {
    element.setAttribute(name, value || '#')
  }
}

function escapeHTML(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function makeTags(selector, tags) {
  const box = document.querySelector(selector)
  if (!box) {
    return
  }

  box.innerHTML = ''
  ;(tags || []).forEach(function (tag) {
    const span = document.createElement('span')
    span.innerText = tag
    box.appendChild(span)
  })
}

function setExternalLink(selector, value, emptyText) {
  const link = document.querySelector(selector)
  if (!link) {
    return
  }

  if (!value || value === '#') {
    link.innerText = emptyText
    link.href = '#'
    link.target = '_self'
    return
  }

  link.href = value
}

function renderMembers() {
  const grid = document.querySelector('.team-detail-member-grid')
  if (!grid) {
    return
  }

  grid.innerHTML = ''
  ;(teamProject.members || []).forEach(function (member) {
    const card = document.createElement('article')
    card.className = member.leader ? 'team-card-member leader' : 'team-card-member'
    card.innerHTML = `
      <strong>${member.leader ? '팀장 ' : ''}${escapeHTML(member.name || '팀원')}</strong>
      <p>${escapeHTML(member.role || '역할 정리 예정')}</p>
      <ul>
        ${(member.tasks || ['작업 내용 정리 예정']).map((task) => `<li>${escapeHTML(task)}</li>`).join('')}
      </ul>
    `

    grid.appendChild(card)
  })
}

function renderGallery() {
  const gallery = document.querySelector('.team-detail-gallery')
  if (!gallery) {
    return
  }

  const images = teamProject.gallery && teamProject.gallery.length > 0 ? teamProject.gallery : [teamProject.image]
  gallery.innerHTML = ''

  images.forEach(function (image, index) {
    const img = document.createElement('img')
    img.src = image
    img.alt = `${teamProject.title || '팀 프로젝트'} 작업 화면 ${index + 1}`
    gallery.appendChild(img)
  })
}

text('.detail-label', teamProject.label || 'TEAM PROJECT')
text('.detail-hero-text h1', teamProject.title)
text('.detail-summary', teamProject.desc)
text('.detail-status', teamProject.source || '팀 프로젝트')
text('.team-source-text', teamProject.source || '팀 프로젝트')
text('.team-goal', teamProject.goal)
text('.team-content', teamProject.content)
text('.team-direction', teamProject.direction)
text('.team-review', teamProject.review)

attr('.detail-hero-img img', 'src', teamProject.image || 'img/commingsoon.png')
attr('.detail-hero-img img', 'alt', teamProject.title || '팀 프로젝트 대표 이미지')

setExternalLink('.detail-btns .primary', teamProject.deploy, '배포 준비중')
setExternalLink('.team-github-btn', teamProject.github, 'GitHub 준비중')
setExternalLink('.team-deploy-link', teamProject.deploy, '배포 준비중')
setExternalLink('.team-github-link', teamProject.github, 'GitHub 준비중')

makeTags('.detail-tags', teamProject.tags)
makeTags('.side-tags', teamProject.tags)
renderMembers()
renderGallery()
