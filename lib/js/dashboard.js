function getQuery(name){
  return document.querySelector(name);
}

const dashboardButtons = document.querySelectorAll('.dashboard-btn')
const dashboardPages = document.querySelectorAll('.panel')

dashboardButtons.forEach((button)=>{
  button.addEventListener('click',()=>{
    dashboardPages.forEach((page)=>{
      page.classList.remove('active');
      page.classList.add('hidden');
    });

    dashboardButtons.forEach((button)=>{
      button.classList.remove('active-btn');
    });

    const buttonDataTarget = button.getAttribute('data-target');
    const targetPage = document.querySelector(buttonDataTarget);
    
    console.log(buttonDataTarget);

    targetPage.classList.remove('hidden');
    targetPage.classList.add('active');
    
    button.classList.add('active-btn');
    
  });
});