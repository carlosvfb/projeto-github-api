const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                            <p>👥 Seguidores ${user.followers}</p>
                                            <p>👥 Seguindo ${user.following}</p>
                                        </div>
                                    </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">
        <h3><strong>${repo.name}</strong></h3>
        <br>
        <div class="info-repositories">
        <p>🍴 ${repo.forks}</p>
        <br>
        <p>⭐ ${repo.stargazers_count}</p>
        <br>
        <p>👀 ${repo.watchers}</p>
        <br>
        <p class="language">👨‍💻 ${repo.language}</p>
        </div>
        </a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                        </div>`
        }

        let eventsItens = '';
        user.events.forEach(event => {
            if (event.payload.commits && event.payload.commits.length > 0) {
                event.payload.commits.forEach(commit => {
                    eventsItens += `<li><strong class="nome-repo">${event.repo.name}</strong> - ${commit.message}</li>
                    <br>`;
                });
            }
        });

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div>
                                        <h2 class="events">Eventos</h2>
                                        <br>
                                        <ul>${eventsItens}</ul>
                                    </div>`;
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }