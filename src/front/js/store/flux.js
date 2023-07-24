import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (userEmail,userPassword) => {
				// console.log(userEmail,userPassword);
				try{
					let response = await axios.post('https://rebecabergottini-ideal-disco-4475975759gh5wr7-3001.preview.app.github.dev/api/login', {
						email:userEmail,
						password:userPassword
					  })
					  if(response.status === 200){
						localStorage.setItem("myToken",response.data.access_token)
						return true;
					  }

				}catch(err){
					console.log(err);
					// err.response.status === 401
					if(err.response.status === 401){
						return false;
					}
				}
			},
			signup: async (email, password) => {
				try {
					const response = await axios.post('https://rebecabergottini-ideal-disco-4475975759gh5wr7-3001.preview.app.github.dev/api/signup', {
						email: email,
						password: password
					});
		
					if (response.status === 201) { // Use 201 for successful registration
						localStorage.setItem("myToken", response.data.access_token);
						return true;
					}
				} catch (err) {
					console.log(err);
					if (err.response.status === 400) {
						return false;
					}
				}
			},
		
			logout: () => {
				let token = localStorage.getItem("myToken")
				return	token != null ? true : false
			},
		}
	};
};

export default getState;
