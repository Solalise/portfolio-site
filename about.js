const profileDefaults = {
  name: '최보원',
  birth: '2004.00.00',
  school: '중부대학교 / 정보보호학과',
  club: '멋쟁이 사자처럼 14기',
  interest: '웹 개발 / 웹 보안 / 취약점 분석',
  image: 'img/about.me.jpg',
}

const skillDefaults = [
  { name: 'HTML / CSS', percent: 40 },
  { name: 'JavaScript', percent: 10 },
  { name: 'Python', percent: 60 },
  { name: 'Linux', percent: 40 },
  { name: 'Node.js', percent: 15 },
  { name: 'SQL', percent: 30 },
]

const storageKeys = {
  profile: 'aboutProfile',
  skills: 'aboutSkills',
  certificates: 'aboutCertificates',
  schedules: 'aboutSchedules',
}

const profileEditor = document.querySelector('#profileEditor')
const skillEditor = document.querySelector('#skillEditor')
const skillList = document.querySelector('#skillList')
const certificateList = document.querySelector('#certificateList')
const certificateInput = document.querySelector('#certificateInput')
const calendarTitle = document.querySelector('#calendarTitle')
const calendarGrid = document.querySelector('#calendarGrid')
const selectedDateTitle = document.querySelector('#selectedDateTitle')
const scheduleInput = document.querySelector('#scheduleInput')
const scheduleList = document.querySelector('#scheduleList')

let profile = loadObject(storageKeys.profile, profileDefaults)
let skills = loadArray(storageKeys.skills, skillDefaults)
let certificates = loadArray(storageKeys.certificates, [
  '네트워크 관리사 2급',
  'SQLD',
])
let schedules = loadObject(storageKeys.schedules, {})
let currentDate = new Date()
let selectedDate = formatDate(currentDate)

function loadObject(key, fallback) {
  try {
    return {
      ...fallback,
      ...JSON.parse(localStorage.getItem(key)),
    }
  } catch (error) {
    localStorage.removeItem(key)
    return fallback
  }
}

function loadArray(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback
  } catch (error) {
    localStorage.removeItem(key)
    return fallback
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function clampPercent(value) {
  const number = Number(value)

  if (Number.isNaN(number)) {
    return 0
  }

  return Math.min(100, Math.max(0, number))
}

function renderProfile() {
  Object.keys(profileDefaults).forEach(function (key) {
    const valueElement = document.querySelector(`[data-profile-value="${key}"]`)
    const inputElement = document.querySelector(`[data-profile-input="${key}"]`)

    if (valueElement) {
      valueElement.innerText = profile[key]
    }

    if (inputElement) {
      inputElement.value = profile[key]
    }
  })

  document.querySelector('#profileImage').src = profile.image
}

function renderSkills() {
  skillList.innerHTML = ''
  skillEditor.innerHTML = ''

  skills.forEach(function (skill, index) {
    const percent = clampPercent(skill.percent)
    const item = document.createElement('li')
    item.className = 'skill-item'
    item.innerHTML = `
      <div class="skill-header">
        <span>${skill.name}</span>
        <span>${percent}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-fill" style="--width: ${percent}%; width: ${percent}%"></div>
      </div>
    `

    const editorRow = document.createElement('label')
    editorRow.innerHTML = `
      <span>${skill.name}</span>
      <input type="range" min="0" max="100" value="${percent}" data-skill-range="${index}" />
      <input type="number" min="0" max="100" value="${percent}" data-skill-number="${index}" />
    `

    skillList.appendChild(item)
    skillEditor.appendChild(editorRow)
  })
}

function renderCertificates() {
  certificateList.innerHTML = ''

  certificates.forEach(function (certificate, index) {
    const badge = document.createElement('span')
    const removeButton = document.createElement('button')

    removeButton.type = 'button'
    removeButton.dataset.certificateIndex = index
    removeButton.innerText = 'x'
    badge.innerText = certificate
    badge.appendChild(removeButton)
    certificateList.appendChild(badge)
  })
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function renderCalendar() {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const lastDate = new Date(year, month + 1, 0).getDate()
  const today = formatDate(new Date())

  calendarTitle.innerText = `${year}년 ${month + 1}월`
  calendarGrid.innerHTML = ''

  for (let i = 0; i < firstDay; i += 1) {
    const emptyCell = document.createElement('div')
    emptyCell.className = 'calendar-day empty'
    calendarGrid.appendChild(emptyCell)
  }

  for (let day = 1; day <= lastDate; day += 1) {
    const date = formatDate(new Date(year, month, day))
    const button = document.createElement('button')
    const count = schedules[date] ? schedules[date].length : 0

    button.className = 'calendar-day'
    button.type = 'button'
    button.dataset.date = date
    button.innerHTML = `
      <span>${day}</span>
      ${count > 0 ? `<small>${count}</small>` : ''}
    `

    if (date === today) {
      button.classList.add('today')
    }

    if (date === selectedDate) {
      button.classList.add('selected')
    }

    calendarGrid.appendChild(button)
  }

  renderScheduleList()
}

function renderScheduleList() {
  selectedDateTitle.innerText = selectedDate
  scheduleList.innerHTML = ''

  const items = schedules[selectedDate] || []

  if (items.length === 0) {
    scheduleList.innerHTML = '<li class="schedule-empty">등록된 일정이 없습니다.</li>'
    return
  }

  items.forEach(function (item, index) {
    const li = document.createElement('li')
    const span = document.createElement('span')
    const button = document.createElement('button')

    span.innerText = item
    button.type = 'button'
    button.dataset.scheduleIndex = index
    button.innerText = '삭제'
    li.appendChild(span)
    li.appendChild(button)
    scheduleList.appendChild(li)
  })
}

function addSchedule() {
  const schedule = scheduleInput.value.trim()

  if (!schedule) {
    return
  }

  if (!schedules[selectedDate]) {
    schedules[selectedDate] = []
  }

  schedules[selectedDate].push(schedule)
  scheduleInput.value = ''
  save(storageKeys.schedules, schedules)
  renderCalendar()
}

document.querySelector('#toggleProfileEditor').addEventListener('click', function () {
  profileEditor.classList.toggle('show')
})

document.querySelector('#toggleSkillEditor').addEventListener('click', function () {
  skillEditor.classList.toggle('show')
})

profileEditor.addEventListener('input', function (event) {
  const key = event.target.dataset.profileInput

  if (!key) {
    return
  }

  profile[key] = event.target.value.trim() || profileDefaults[key]
  save(storageKeys.profile, profile)
  renderProfile()
})

document.querySelector('#resetProfile').addEventListener('click', function () {
  profile = { ...profileDefaults }
  save(storageKeys.profile, profile)
  renderProfile()
})

skillEditor.addEventListener('input', function (event) {
  const rangeIndex = event.target.dataset.skillRange
  const numberIndex = event.target.dataset.skillNumber
  const index = Number(rangeIndex || numberIndex)

  if (!Number.isInteger(index)) {
    return
  }

  skills[index].percent = clampPercent(event.target.value)
  save(storageKeys.skills, skills)
  renderSkills()
})

document.querySelector('#addCertificate').addEventListener('click', function () {
  addCertificate()
})

certificateInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addCertificate()
  }
})

function addCertificate() {
  const certificate = certificateInput.value.trim()

  if (!certificate) {
    return
  }

  certificates.push(certificate)
  certificateInput.value = ''
  save(storageKeys.certificates, certificates)
  renderCertificates()
}

certificateList.addEventListener('click', function (event) {
  const index = Number(event.target.dataset.certificateIndex)

  if (!Number.isInteger(index)) {
    return
  }

  certificates.splice(index, 1)
  save(storageKeys.certificates, certificates)
  renderCertificates()
})

document.querySelector('#prevMonth').addEventListener('click', function () {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
  renderCalendar()
})

document.querySelector('#nextMonth').addEventListener('click', function () {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
  renderCalendar()
})

calendarGrid.addEventListener('click', function (event) {
  const dayButton = event.target.closest('.calendar-day[data-date]')

  if (!dayButton) {
    return
  }

  selectedDate = dayButton.dataset.date
  renderCalendar()
})

document.querySelector('#addSchedule').addEventListener('click', addSchedule)

scheduleInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addSchedule()
  }
})

scheduleList.addEventListener('click', function (event) {
  const index = Number(event.target.dataset.scheduleIndex)

  if (!Number.isInteger(index)) {
    return
  }

  schedules[selectedDate].splice(index, 1)

  if (schedules[selectedDate].length === 0) {
    delete schedules[selectedDate]
  }

  save(storageKeys.schedules, schedules)
  renderCalendar()
})

renderProfile()
renderSkills()
renderCertificates()
renderCalendar()
