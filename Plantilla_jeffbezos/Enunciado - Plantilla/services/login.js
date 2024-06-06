const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const email= document.getElementById('email1').value;
    const password= document.getElementById('password1').value;

    fetch('http://localhost:4500/users')
    .then(res=> res.json())
    .then(users => {
        const userE= users.find(user => user.email === email && user.password === password);
        const role= users.find(user => user.role ==='admin');
        
        if (userE === role){
            alert("inicio de sesion exitoso");
            window.location.href='../views/admin.html';
        }else if (userE){
            alert("Inicio de sesion exitoso");
            window.location.href='../views/visitor.html';
        }else if (userE == null){
            alert("Error al iniciar sesion")
        }

        

    })
})