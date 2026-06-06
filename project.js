const projectGrid = document.querySelector('#projectGrid')
const addBtn = document.querySelector('#addProjectBtn')
const openAddModal = document.querySelector('#openAddModal')
const closeAddModal = document.querySelector('#closeAddModal')
const projectModal = document.querySelector('#projectModal')
const searchInput = document.querySelector('#searchInput')
const filterBtns = document.querySelectorAll('.filter-btn')

const defaultProjects = [
  {
    title: '실습 웹사이트 제작',
    category: 'Web',
    status: '완료',
    desc: 'HTML, CSS, JavaScript를 사용해서 기본적인 웹 기능을 실습한 프로젝트입니다.',
    image: 'img/hcjmain.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: '#',
    deploy: 'https://html-hcj-project.vercel.app/index.html',
    detailLabel: 'WEB PRACTICE PROJECT',
    overview:
      'HTML, CSS, JavaScript의 기본 기능을 연습하기 위해 제작한 실습형 웹사이트입니다.',
    purpose: '웹사이트 구조와 페이지 연결 방식을 익히기 위해 제작했습니다.',
    pages: ['<strong>Main</strong> : 메인 화면', '<strong>Form</strong> : 입력 양식'],
    features: ['페이지 이동', '카드형 UI', 'HTML/CSS/JS 활용'],
    previewItems: [
      {
        title: 'Table 페이지',
        image: 'img/hcjtable.png',
        desc: 'table 태그를 활용해 시간표 형태의 화면을 구성했습니다.',
      },
      {
        title: 'List 페이지',
        image: 'img/hcj list.png',
        desc: 'list 태그를 활용해 메뉴 목록 형태의 화면을 구성했습니다.',
      },
      {
        title: 'Form 페이지',
        image: 'img/form.png',
        desc: '입력창과 버튼을 배치한 폼 화면입니다.',
      },
      {
        title: 'Media 페이지',
        image: 'img/hcj media.png',
        desc: '이미지와 미디어 요소를 정리해서 보여주는 화면입니다.',
      },
    ],
    role: '전체 기획과 구현을 직접 진행했습니다.',
    difficulty: '파일 경로와 레이아웃 조정이 어려웠습니다.',
    solution: '예제 코드와 수업 자료를 참고하며 수정했습니다.',
    learned: '웹사이트 구조와 DOM 조작의 기본 흐름을 배웠습니다.',
  },
  {
    title: '포트폴리오 소개 웹사이트 제작',
    category: 'Web',
    status: '완료',
    desc: '저의 포트폴리오를 소개하기 위해 만든 웹사이트입니다.',
    image: 'img/portfolio site main.png',
    tags: ['HTML', 'CSS'],
    github: '#',
    deploy: '#',
    detailLabel: 'PORTFOLIO WEBSITE',
    overview: '개인 소개와 프로젝트를 정리한 포트폴리오 사이트입니다.',
    purpose: '학습 내용과 프로젝트를 보기 쉽게 정리하기 위해 제작했습니다.',
    pages: ['<strong>Main</strong> : 메인 화면', '<strong>Project</strong> : 프로젝트 목록'],
    features: ['내비게이션', '카드형 목록', '반응형 레이아웃'],
    previewItems: [
      {
        title: 'Main 화면',
        image: 'img/portfolio site main.png',
        desc: '포트폴리오 사이트의 첫 화면입니다.',
      },
    ],
    role: '기획, 디자인, HTML/CSS 작성을 직접 진행했습니다.',
    difficulty: '페이지별 디자인 톤을 맞추는 과정이 어려웠습니다.',
    solution: '공통 CSS 클래스를 사용해 레이아웃을 정리했습니다.',
    learned: '공통 레이아웃 관리 방법을 배웠습니다.',
  },
]

let projects = loadProjects()
let currentCategory = '전체'

function loadProjects() {
  try {
    return JSON.parse(localStorage.getItem('projects')) || defaultProjects
  } catch (error) {
    localStorage.removeItem('projects')
    return defaultProjects
  }
}

function saveProjects() {
  localStorage.setItem('projects', JSON.stringify(projects))
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

function getStatusClass(status) {
  if (status === '설계중' || status === '구상중' || status === '예정') {
    return 'planned'
  }

  if (status === '진행중' || status === '진행 중') {
    return 'progress'
  }

  return 'done'
}

function parsePreviewItems(value, fallbackImage, fallbackDesc) {
  const items = value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, image, ...descParts] = line.split('|').map((part) => part.trim())
      const desc = descParts.join(' | ')

      return {
        title: title || '화면 미리보기',
        image: image || fallbackImage,
        desc: desc || fallbackDesc,
      }
    })

  if (items.length > 0) {
    return items
  }

  return [
    {
      title: '대표 화면',
      image: fallbackImage,
      desc: fallbackDesc,
    },
  ]
}

function renderProjects() {
  projectGrid.innerHTML = ''

  const keyword = searchInput.value.toLowerCase()
  const filteredProjects = projects.filter(function (project) {
    const matchCategory =
      currentCategory === '전체' ||
      project.category.toLowerCase() === currentCategory.toLowerCase()

    const matchSearch =
      project.title.toLowerCase().includes(keyword) ||
      project.desc.toLowerCase().includes(keyword) ||
      project.category.toLowerCase().includes(keyword) ||
      (project.status || '').toLowerCase().includes(keyword)

    return matchCategory && matchSearch
  })

  filteredProjects.forEach(function (project) {
    const realIndex = projects.indexOf(project)
    const safeTitle = escapeHTML(project.title)
    const safeCategory = escapeHTML(project.category)
    const safeDesc = escapeHTML(project.desc)
    const status = project.status || '완료'
    const safeStatus = escapeHTML(status)
    const safeStatusClass = escapeHTML(getStatusClass(status))
    const safeTags = (project.tags || [])
      .map((tag) => `<span>${escapeHTML(tag)}</span>`)
      .join('')

    const card = document.createElement('div')
    card.className = 'project-card-box'
    card.innerHTML = `
      <img src="${project.image}" alt="${safeTitle}" class="project-thumb">

      <div class="project-content">
        <div class="project-meta">
          <span class="project-category">${safeCategory}</span>
          <span class="status ${safeStatusClass}">${safeStatus}</span>
        </div>
        <h3>${safeTitle}</h3>
        <p>${safeDesc}</p>

        <div class="project-tags">
          ${safeTags}
        </div>

        <div class="project-btns">
          <button class="project-btn detail" type="button" data-action="detail" data-index="${realIndex}">
            자세히 보기
          </button>
          <button class="project-btn sub" type="button" data-action="delete" data-index="${realIndex}">
            삭제
          </button>
        </div>
      </div>
    `

    projectGrid.appendChild(card)
  })

  if (filteredProjects.length === 0) {
    projectGrid.innerHTML = '<p class="empty-project-message">검색 결과가 없습니다.</p>'
  }
}

function openDetail(index) {
  localStorage.setItem('selectedProjectIndex', index)
  location.href = 'project-detail.html'
}

function deleteProject(index) {
  if (confirm('이 프로젝트를 삭제할까요?')) {
    projects.splice(index, 1)
    saveProjects()
    renderProjects()
  }
}

function addProject() {
  const file = document.querySelector('#imageFile').files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = function () {
      createProject(reader.result)
    }
    reader.readAsDataURL(file)
  } else {
    createProject('img/commingsoon.png')
  }
}

function createProject(imageData) {
  const title = document.querySelector('#title').value.trim()
  const category = document.querySelector('#category').value.trim()
  const status = document.querySelector('#status').value
  const tags = document.querySelector('#tags').value.trim()
  const deploy = document.querySelector('#deploy').value.trim()
  const desc = document.querySelector('#desc').value.trim()

  if (title === '' || category === '' || desc === '') {
    alert('제목, 카테고리, 설명은 반드시 입력해야 합니다.')
    return
  }

  const previewText = document.querySelector('#previewItems').value
  const newProject = {
    createdAt: Date.now(),
    title: title,
    category: category,
    status: status,
    desc: desc,
    image: imageData,
    tags: tags ? splitCommaList(tags) : ['New', category],
    github: '#',
    deploy: deploy || '#',
    detailLabel: document.querySelector('#detailLabel').value.trim() || 'NEW PROJECT',
    overview: document.querySelector('#overview').value.trim() || desc,
    purpose:
      document.querySelector('#purpose').value.trim() ||
      '새로 추가한 프로젝트입니다.',
    pages: document.querySelector('#pages').value.trim()
      ? splitCommaList(document.querySelector('#pages').value)
      : ['<strong>New</strong> : 새 프로젝트'],
    features: document.querySelector('#features').value.trim()
      ? splitCommaList(document.querySelector('#features').value)
      : ['localStorage 프로젝트 추가 기능'],
    previewItems: parsePreviewItems(previewText, imageData, desc),
    role:
      document.querySelector('#role').value.trim() ||
      '프로젝트 정보를 직접 입력하여 추가했습니다.',
    difficulty:
      document.querySelector('#difficulty').value.trim() ||
      '상세 내용을 구성하는 과정이 필요했습니다.',
    solution:
      document.querySelector('#solution').value.trim() ||
      '입력값을 객체로 만들어 저장했습니다.',
    learned:
      document.querySelector('#learned').value.trim() ||
      '폼 입력값과 localStorage 활용 방법을 배웠습니다.',
  }

  projects.push(newProject)
  saveProjects()
  renderProjects()
  clearForm()

  projectModal.classList.remove('show')
  alert('프로젝트가 추가되었습니다.')
}

function clearForm() {
  document
    .querySelectorAll('.project-modal-box input, .project-modal-box textarea')
    .forEach(function (input) {
      input.value = ''
    })

  document.querySelector('#status').value = '설계중'
}

openAddModal.addEventListener('click', function () {
  projectModal.classList.add('show')
})

closeAddModal.addEventListener('click', function () {
  projectModal.classList.remove('show')
})

addBtn.addEventListener('click', addProject)
searchInput.addEventListener('keyup', renderProjects)

projectGrid.addEventListener('click', function (event) {
  const button = event.target.closest('button[data-action]')

  if (!button) {
    return
  }

  const index = Number(button.dataset.index)

  if (button.dataset.action === 'detail') {
    openDetail(index)
  }

  if (button.dataset.action === 'delete') {
    deleteProject(index)
  }
})

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    filterBtns.forEach(function (button) {
      button.classList.remove('active')
    })

    btn.classList.add('active')
    currentCategory = btn.innerText
    renderProjects()
  })
})

renderProjects()
