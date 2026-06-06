const contactForm = document.querySelector('#contactForm')
const contactFormMessage = document.querySelector('#contactFormMessage')
const contactModal = document.querySelector('#contactModal')
const openContactModal = document.querySelector('#openContactModal')
const closeContactModal = document.querySelector('#closeContactModal')
const contactStorageKey = 'contactMessages'

function loadMessages() {
  try {
    return JSON.parse(localStorage.getItem(contactStorageKey)) || []
  } catch (error) {
    localStorage.removeItem(contactStorageKey)
    return []
  }
}

function saveMessage(message) {
  const messages = loadMessages()
  messages.push({
    ...message,
    createdAt: new Date().toISOString(),
  })
  localStorage.setItem(contactStorageKey, JSON.stringify(messages))
}

function openModal() {
  contactModal.classList.add('show')
  contactFormMessage.innerText = ''
  contactFormMessage.className = 'contact-form-message'
}

function closeModal() {
  contactModal.classList.remove('show')
}

openContactModal.addEventListener('click', openModal)
closeContactModal.addEventListener('click', closeModal)

contactModal.addEventListener('click', function (event) {
  if (event.target === contactModal) {
    closeModal()
  }
})

contactForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const formData = new FormData(contactForm)
  const message = {
    name: formData.get('name').trim(),
    email: formData.get('email').trim(),
    title: formData.get('title').trim(),
    message: formData.get('message').trim(),
  }

  if (!message.name || !message.email || !message.title || !message.message) {
    contactFormMessage.innerText = '모든 항목을 입력해주세요.'
    contactFormMessage.className = 'contact-form-message error'
    return
  }

  saveMessage(message)
  contactForm.reset()
  contactFormMessage.innerText = '문의가 저장되었습니다. 확인해주셔서 감사합니다.'
  contactFormMessage.className = 'contact-form-message success'

  setTimeout(closeModal, 900)
})
