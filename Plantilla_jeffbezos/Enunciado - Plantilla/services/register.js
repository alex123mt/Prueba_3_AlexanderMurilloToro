const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name= document.getElementById('name').value;
    const email= document.getElementById('email').value;
    const dob= document.getElementById('dob').value;
    const password= document.getElementById('password').value;

    fetch('http://localhost:4500/users',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            dob,
            password
        })
    })
})