const fallbackTeamProject = {
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
      ${member.image ? `<img src="${escapeHTML(member.image)}" alt="${escapeHTML(member.name || '팀원')} 프로필 이미지" class="member-avatar">` : ''}
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
