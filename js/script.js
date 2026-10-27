/**************** DEFINIZIONE FUNZIONI *************/

function renderTeam(listaMembri) {

	const teamCardsContainer = document.querySelector(".team-container");

	let htmlDaScrivere = "";

	for (const thisMember of listaMembri) {

		htmlDaScrivere += getMemberCard(thisMember);

	}

	teamCardsContainer.innerHTML = htmlDaScrivere;

}

function getMemberCard(member) {

	return `
		<div class="team-card">
			<div class="card-image">
				<img src="img/${member.image}" alt="${member.name}" />
			</div>
			<div class="card-text">
				<h3>${member.name}</h3>
				<p>${member.role}</p>
			</div>
		</div>`;

}

function onFormSubmit(event) {
	event.preventDefault();

	const nameField = document.getElementById('name');
	const roleField = document.getElementById('role');
	const imageField = document.getElementById('image');

	const newName = nameField.value;
	const newRole = roleField.value;
	const newImage = imageField.value;

	// console.log(newName, newRole, newImage);

	if (!newName || !newRole || !newImage) {
		alert("I campi sono obbligatori");
		return;
	}

	const newMember = {
		name: newName,
		role: newRole,
		image: newImage
	};

	// console.log("Creato nuovo oggetto: ", newMember);

	teamMembers.push(newMember);

	saveMembersToStorage(teamMembers);
	renderTeam(teamMembers);

	event.target.reset();

}

function saveMembersToStorage(membersList) {

	const datoSerializzato = JSON.stringify(membersList);

	localStorage.setItem("members", datoSerializzato);

}

function loadMembersFromStorage() {

	const datoSerializzato = localStorage.getItem("members");

	const nuovoArray = JSON.parse(datoSerializzato);

	return nuovoArray;
}


/********************** DATA ***********************/

let teamMembers = [
	{
		name: 'Wayne Barnett',
		role: 'Founder & CEO',
		image: 'wayne-barnett-founder-ceo.jpg',
	},
	{
		name: 'Angela Caroll',
		role: 'Chief Editor',
		image: 'angela-caroll-chief-editor.jpg',
	},
	{
		name: 'Walter Gordon',
		role: 'Office Manager',
		image: 'walter-gordon-office-manager.jpg',
	},
	{
		name: 'Angela Lopez',
		role: 'Social Media Manager',
		image: 'angela-lopez-social-media-manager.jpg',
	},
	{
		name: 'Scott Estrada',
		role: 'Developer',
		image: 'scott-estrada-developer.jpg',
	},
	{
		name: 'Barbara Ramos',
		role: 'Graphic Designer',
		image: 'barbara-ramos-graphic-designer.jpg',
	},
];

/******************* PAGE INIT *********************/

const membriSalvati = loadMembersFromStorage();

// Se ho dati salvati (in localstorage), allora voglio usarli
// altrimenti voglio usare dei dati di default

if (membriSalvati == null) {
	saveMembersToStorage(teamMembers);
} else {
	teamMembers = membriSalvati;
}

// Renderizza cards
renderTeam(teamMembers);


// Gestisci il form
const form = document.getElementById('member-form');
form.addEventListener("submit", onFormSubmit);
