const apiKey = "vG8VsrGnFDjaDgsn3RQ1gGiAKlOcMMXqFixHdC0p"; // 🔑 Replace with your actual Cohere API key
const button = document.getElementById('button')

const allChat = document.getElementById('all-chat')


console.log(allChat)
let createP=(d,cl)=>{
	let p = document.createElement('p')
	p.classList.add(cl)
	p.innerHTML=`${d}`;
	allChat.appendChild(p)
}


async function getData() {
	let prompt = document.getElementById("input-msg").value;
createP(prompt,'use')

// Add loading message
const loading = document.createElement('p');
loading.textContent = "Loading...";
loading.classList.add('bot');
allChat.appendChild(loading);
//const loading = createP("...", "loading");

button.disabled = true;
	const res = await fetch("https://api.cohere.ai/v1/chat", {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${apiKey}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			message: prompt,
			model: "command-r-plus",
			temperature: 0.7,
		})
	});
	
	const data = await res.json();
	console.log(data)
allChat.removeChild(loading); 
// Try extracting message safely
const botReply = data.text || (data.generations && data.generations[0]?.text) ||"No response from bot";

createP(botReply, 'bot');
	button.disabled = false;
	document.getElementById("input-msg").value = '';

//	document.getElementById("response").innerText =
//		data.text || "No response!";
}






button.addEventListener('click',()=>{
	
	getData()
})