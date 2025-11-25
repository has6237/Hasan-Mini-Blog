let user = [];
let currentUser = null;
let posts = [];

function show(section) {
	document.querySelectorAll(".box").forEach(b => b.classList.add("hidden"));
	document.getElementById(section).classList.remove("hidden");
}

function mainMenu() {
	show("menuBox");
}

function signup() {
	show("signupBox");
}

function openAccount() {
	let yourName = document.getElementById("yourName").value;
	let yourEmail = document.getElementById("yourEmail").value;
	let yourUsername = document.getElementById("yourUsername").value;
	let yourPassword = document.getElementById("yourPassword").value;
	let confirmYourPassword = document.getElementById("confirmYourPassword").value;

	if(yourPassword !== confirmYourPassword) {
		alert("Password did not match");
		return;
	}

	if(user.find(u => u.email === yourEmail)) {
		alert("Email already exist! Use a different one");
		return;
	}

	if(user.find(u => u.username === yourUsername)) {
		alert("Username already taken! Use a different one");
		return;
	}

	user.push ({
		name: yourName,
		email: yourEmail,
		username: yourUsername,
		password: yourPassword
	});
	mainMenu();

}

function loginNow() {
	show("loginBox");
}

function userMenu() {
	show("usermenuBox");
}
function login() {
	let loginUsername = document.getElementById("loginUsername").value;
	let loginPassword = document.getElementById("loginPassword").value;

	if(user.find(u => u.username === loginUsername && u.password === loginPassword)) {
		currentUser = loginUsername;
		alert("Login successfull!");
		userMenu();

	}
	else {
		alert("Invalid username or password!");
		loginNow();
		
	}

}

function myProfile() {
	let find = user.find(u => u.username === currentUser);

	document.getElementById("myProfileOutput").innerHTML =
	`<b>Name:</b> ${find.name}<br>
	<b>Email:</b> ${find.email}<br>
	<b>Username:</b> ${find.username}<br>`;
	show("myProfileBox");
}

function editProfile() {
	show("editProfileBox");
}


function editName() {
	show("editNameBox");
}
function updateName() {
	let newName = document.getElementById("newName").value;
	let find = user.find(u => u.username === currentUser);
	find.name = newName;
	alert("Name updated successfully");
	userMenu();
}

function editEmail() {
	show("editEmailBox");
}

function updateEmail() {
	let newEmail = document.getElementById("newEmail").value;
	let find = user.find(u => u.username === currentUser);
	if (user.find(u => u.email === newEmail)) {
		alert("Email already exist! Use a different one.");
		return;

	}
	else {
		find.email = newEmail;
		alert("Email already updated.");
		userMenu();
	}
}


function editPassword() {
	show("editPasswordBox");
}

function updatePassword() {
	let newPassword = document.getElementById("newPassword").value;
	let confirmNewPassword = document.getElementById("confirmNewPassword").value;
	let find = user.find(u => u.username === currentUser);

	if(newPassword == confirmNewPassword) {
		find.password = newPassword;
		alert("Password updated successfully.");
		userMenu();

	}
	else {
		alert("Password did not match!");
		return;
	}
}

function postNow() {
	show("postBox");
}

function post() {
	let title = document.getElementById("postTitle").value;
	let postContent = document.getElementById("postContent").value;

	let postUploader = user.find(u => u.username === currentUser);
	let date = new Date().toLocaleString();

	posts.unshift({
		username: currentUser,
		title: title,
		postContent: postContent,
		date: date
	});
	alert("Your story shared");
	userMenu();

}

function myPosts() {
	let postHistory = posts.filter(u => u.username === currentUser);
	let myPostHistory = document.getElementById("myPostsOutput");

	myPostHistory.innerHTML = "";

	postHistory.forEach((h, index) => {
	let div = document.createElement("div");
	myPostHistory.innerHTML += `
            <p>Posted at: ${h.date}</p>
            <p>Title: ${h.title}</p>
	  <p>${h.postContent}</p><br>
	  <button onclick="deletePost(${index})">Delete</button>
            <hr>
        `;
        myPostHistory.appendChild(div);
			});
			show("myPostsBox");
}

function deletePost(i) {
        posts.splice(i, 1);
        alert("Post deleted");
        myPosts();
    }

function newsFeed() {
	let showNewsFeed = document.getElementById("feedOutput");
	showNewsFeed.innerHTML = "";

	posts.forEach((p) => {
		showNewsFeed.innerHTML +=
		`
            <p>${p.username}</p>
	  <p>Title: ${p.title}</p>
	  <p>${p.date}</p>
	  <p>${p.postContent}</p><br>
            <hr>
        `;


	});
	show("feedBox");
}

function logout() {
	currentUser = null;
	show("menuBox");
}





