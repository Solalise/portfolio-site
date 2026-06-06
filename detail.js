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

let projects = defaultProjects

try {
  projects = JSON.parse(localStorage.getItem('projects')) || defaultProjects
} catch (error) {
  localStorage.removeItem('projects')
}

const selectedIndex = localStorage.getItem('selectedProjectIndex')
const project = projects[selectedIndex] || projects[0]

function text(selector, value) {
  const element = document.querySelector(selector)
  if (element) {
    element.innerText = value
  }
}

function attr(selector, name, value) {
  const element = document.querySelector(selector)
  if (element) {
    element.setAttribute(name, value)
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

function makeList(selector, items) {
  const list = document.querySelector(selector)
  if (!list) {
    return
  }

  list.innerHTML = ''
  ;(items || []).forEach(function (item) {
    const li = document.createElement('li')
    li.innerHTML = item
    list.appendChild(li)
  })
}

function setCardText(cardIndex, value) {
  const card = document.querySelector(`.detail-card:nth-child(${cardIndex})`)
  const paragraph = card ? card.querySelector('p') : null

  if (paragraph) {
    paragraph.innerText = value || ''
  }
}

function getPreviewItems() {
  if (Array.isArray(project.previewItems) && project.previewItems.length > 0) {
    return project.previewItems
  }

  return [
    {
      title: '대표 화면',
      image: project.image,
      desc: project.desc,
    },
  ]
}

function renderPreviewItems() {
  const previewGrid = document.querySelector('.preview-grid')
  if (!previewGrid) {
    return
  }

  previewGrid.innerHTML = ''

  getPreviewItems().forEach(function (item) {
    const box = document.createElement('div')
    box.className = 'preview-box'

    const image = document.createElement('img')
    image.src = item.image || project.image
    image.alt = item.title || project.title

    const title = document.createElement('h3')
    title.innerText = item.title || '화면 미리보기'

    const desc = document.createElement('p')
    desc.innerText = item.desc || project.desc

    box.appendChild(image)
    box.appendChild(title)
    box.appendChild(desc)
    previewGrid.appendChild(box)
  })
}

text('.detail-label', project.detailLabel)
text('.detail-hero-text h1', project.title)
text('.detail-summary', project.desc)
text('.detail-status', project.status || '완료')
document.querySelector('.detail-status').className =
  `status detail-status ${getStatusClass(project.status || '완료')}`
attr('.detail-hero-img img', 'src', project.image)
attr('.detail-hero-img img', 'alt', project.title)
attr('.detail-btns .primary', 'href', project.deploy || '#')

if (!project.deploy || project.deploy === '#') {
  text('.detail-btns .primary', '배포 준비중')
  attr('.detail-btns .primary', 'href', '#')
  attr('.detail-btns .primary', 'target', '_self')
}

makeTags('.detail-tags', project.tags)
makeTags('.side-tags', project.tags)
makeList('.detail-card:nth-child(3) .detail-list', project.pages)
makeList('.detail-card:nth-child(4) .detail-list', project.features)
makeList('.side-list', project.pages)

setCardText(1, project.overview)
setCardText(2, project.purpose)
setCardText(6, project.role)
setCardText(7, project.difficulty)
setCardText(8, project.solution)
setCardText(9, project.learned)
renderPreviewItems()
