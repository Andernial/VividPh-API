# VividPh API 📷 - Em desenvolvimento

## Descrição 📗
Esta API foi desenvolvida para o projeto VividPh, ela trata de gerenciar usuários e posts em um banco de dados MySQL.

Atualmente nem todas as verificações de dados foram implementadas.

Verificação JWT ainda será adicionada.

## Tecnologias utilizadas 👾
node, express, cors, nodemon e mysql. 

## Atualização mais Recente ➡️

em Desenvolvimento 🛠️

## ⚙️Configuração do Ambiente

Configure o .Env
```
DB_HOST = 'host do banco'
DB_USER = 'usuario do banco'
DB_PASSWORD = 'senha do banco mysql (se tiver)'
DATABASE= 'nome do banco'
```

Configure o cors para consumir a api de outras origens (a configuração default permite de todos os lugares) : 
```
const corsOptions = {
    origin: 'url', 
    methods: 'GET,POST,DELETE,PUT',           
    optionsSuccessStatus: 200     
  }
```


## Arquivo com rotas de testes pré prontas para o insomnia 🧪
*Insomnia Routes VividPh V1* pode ser encontrado na pasta raiz do projeto (mesma pasta que o package json).
Para utilizar as rotas de teste basta importar a collection para seu insomnia.

## Endpoints 📫

## Usuário 

### Registrando Usuário

- **Endpoint**: `localhost:porta/user/create`
- **Método HTTP**: POST
- **Descrição**: Cria um novo usuário no banco de dados.

#### Parâmetros de Requisição
```json
{
	"name":"usuario",
	"email":"email",
	"password":"564654"
}
```



#### Resposta

```json
{
	"message": "usuário criado com sucesso!"
}
```

### Mostra todos os usuários

- **Endpoint**: `localhost:porta/user/show-all`
- **Método HTTP**: GET
- **Descrição**: Mostra todos os usuários no banco de dados.


#### Resposta

```json
{
	"results": [
		{
			"id": 1,
			"name": "Anderson",
			"email": "email",
			"password": "456465",
			"created_at": "2024-06-15T20:00:13.000Z",
			"updated_at": "2024-06-15T20:00:13.000Z"
		}
	]
}
```

### Atualizando Usuário

- **Endpoint**: `localhost:porta/user/update/id`
- **Método HTTP**: PATCH
- **Descrição**: Atualiza o usuário dentro do banco de dados de acordo com os dados passados.

#### json de Requisição

```json
{
	"name":"teste",
	"email":"email@email.com",
	"password":"126540"
}

```
#### Resposta

```json
{
	"results": {
		"id": 1,
		"name": "teste",
		"email": "email@email.com",
		"password": "126540",
		"created_at": "2024-06-15T20:00:02.000Z",
		"updated_at": "2024-06-15T20:04:27.000Z"
	}
}
```

### Deletando usuário

- **Endpoint**: `localhost:porta/user/delete/:id`
- **Método HTTP**: DELETE
- **Descrição**: Deleta usuário de acordo com o id.


#### Exemplo de Requisição

```json
```

#### Resposta


```json
{
	"message": "usuário deletado com sucesso!"
}
```

## Posts - Endpoints post em desenvolvimento 🛠️ (mais endpoints relacionados aos posts serão adicionados)

### Criando Posts

- **Endpoint**: `localhost:/post/create/userId`
- **Método HTTP**: POST
- **Descrição**: Cria um novo post no banco de dados.

#### Parâmetros de Requisição
```json
{
	"title":"titulo",
	"youtubeUrl":"urlexample",
	"publicId":"idPublicoCloudnaryImage",
	"url":"exampleCloudinaryImageUrl"
}
```

#### Resposta

```json
{
	"results": {
		"id": 3,
		"title": "titulo",
		"urlYoutube": "urlexample",
		"user_name": "Anderson",
		"images": [
			{
				"image_id": 14,
				"public_id": "idPublicoCloudnaryImage",
				"url": "exampleCloudinaryImageUrl"
			}
		]
	}
}
```

### Mostra todos os Posts

- **Endpoint**: `localhost:porta/post/show-all`
- **Método HTTP**: GET
- **Descrição**: Mostra todos os Posts no banco de dados.


#### Resposta

```json
{
	"results": [
		{
			"post_id": 1,
			"post_title": "titulo",
			"post_youtube_url": "urlExample",
			"image_id": 12,
			"image_public_id": "CloudinaryIdExample",
			"image_url": "UrlExample",
			"user_name": "Anderson"
		}
	]
}
```

### Atualizando Post

- **Endpoint**: `localhost:porta/post/update/postId`
- **Método HTTP**: PATCH
- **Descrição**: Atualiza o usuário dentro do banco de dados de acordo com os dados passados.

#### json de Requisição

```json
{
	"title":"post4",
	"youtubeUrl":"superid1teste",
	"publicId":"testeId",
	"url":"httpurlteste"
}

```
#### Resposta

```json
{
	"results": {
		"id": 1,
		"title": "post4",
		"urlYoutube": "superid1teste",
		"image": {
			"id": 12,
			"publicId": "testeId",
			"url": "httpurlteste"
		}
	}
}
```

### Deletando Post

- **Endpoint**: `localhost:porta/post/delete/:postId`
- **Método HTTP**: DELETE
- **Descrição**: Deleta post de acordo com o id.


#### Exemplo de Requisição

```json
```

#### Resposta


```json
{
	"message": "post deletado com sucesso!"
}
```


## Para Utilizar o Front 🖥️
Versão 1 do front ainda está em desenvolvimento 🛠️
https://github.com/Andernial/VividPh

## Considerações finais 📦
Este projeto foi desenvolvido sem orm com o intuito de ser um treinamento para desenvolver projetos com mysql puro. Ainda vai ser atualizado para atender as necessidades do front.
