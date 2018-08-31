chrome.extension.sendMessage({}, response => {
	let readyStateCheckInterval = setInterval(() => {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval)

			// Pull an image from PlaceCage (in base64)
			let randomSquareSize = Math.floor(Math.random() * 500) + 100  
			let cageImageUrl = 'https://www.placecage.com/gif/' + randomSquareSize + '/' + randomSquareSize
			fetch(cageImageUrl).then(response => response.blob()).then(blob => {
				
				// Login to the UberConference API: 
				let loginUrl = 'https://www.uberconference.com/api/i1/login'
				chrome.storage.sync.get({
					uc_username: '',
					uc_password: ''
				}, (options) => {
					let loginPayload = {
						"email": options.uc_username,
						"password": options.uc_password
					}
					fetch(loginUrl, {
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(loginPayload),
						method: 'POST'
					}).then(response => response.json())
					.then(data => {

						// Upload our majestic ripped Nic Cage picture to UberConf: 
						let profilePictureUrl = 'https://www.uberconference.com/api/i1/profilepictures/';
						let accessToken = data.data.auth.access_token;
						fetch(profilePictureUrl, {
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body: blob,
							method: 'POST'
						})
					})
				})
			})
		}
	}, 10)
})