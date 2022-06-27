const pageWithouContent = `
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-testid="document-title">My page</title>
    <style>
      .awesome {
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <main>
      <h1 data-testid="body-title">This is a simple Page</h1>
    
      <p data-testid="f-paragraph">This is my first paragraph.</p>
      <p class="awesome" data-testid="s-paragraph">The is the second paragraph.</p>
      <p id="third" class="awesome" data-testid="t-paragraph">The is the third paragraph.</p>

      <ul data-testid="list">
        <li data-testid="list-f-item">My first item</li>
        <li data-testid="list-s-item">My second item</li>
        <li data-testid="list-s-item">My third item</li>
      </ul>
    </main>
  </body>
`

const pageWithMissingContent = `
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <template type="language-group">
      <title language='en-US' data-testid="document-title">My page</title>
      <title language='pt-BR' data-testid="document-title">Minha página</title>
    </template>

    <style>
      .awesome {
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <main>
      <template type="language-group">
        <h1 language='en-US' data-testid="body-title">This is a simple Page</h1>
      </template>
      
      <template type="language-group">
        <p language='en-US' data-testid="f-paragraph">This is my first paragraph.</p>
        <p language='pt-BR' data-testid="f-paragraph">Esse é o meu primeiro paragráfo.</p>
      </template>

      <template type="language-group">
        <p language='en-US' class="awesome" data-testid="s-paragraph">The is the second paragraph.</p>
      </template>

      <template type="language-group">
        <p language='en-US' id="third" class="awesome" data-testid="t-paragraph">The is the third paragraph.</p>
        <p language='pt-BR' id="third" class="awesome" data-testid="t-paragraph">Esse é meu terceiro paragráfo.</p>
      </template>
      
      <ul data-testid="list">
        <template type="language-group">
          <li language='en-US' data-testid="list-f-item">My first item</li>
          <li language='pt-BR' data-testid="list-f-item">Meu primeiro item</li>
        </template>

        <template type="language-group">
          <li language='en-US' data-testid="list-s-item">My second item</li>
        </template>

        <template type="language-group">
          <li language='en-US' data-testid="list-s-item">My third item</li>
          <li language='pt-BR' data-testid="list-s-item">Meu terceiro item</li>
        </template>
      </ul>

      <template type="language-group">
        <ul language='en-US' data-testid="list-complete">
          <li>My first item</li>
          <li>My second item</li>
          <li>My third item</li>
        </ul>
        <ul language='pt-BR' data-testid="list-complete">
          <li>Meu primeiro item</li>
          <li>Meu segundo item</li>
          <li>Meu terceiro item</li>
        </ul>
      </template>

      <template type="language-group">
        <ul language='es' data-testid="list-complete-ad">
          <li>Mi primer articulo</li>
          <li>Mi segundo articulo</li>
          <li>Mi tercer articulo</li>
        </ul>
      </template>
    </main>
  </body>
`

const pageWithContent = `
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <template type="language-group">
      <title language='en-US' data-testid="document-title">My page</title>
      <title language='pt-BR' data-testid="document-title">Minha página</title>
    </template>

    <style>
      .awesome {
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <main>
      <template type="language-group">
        <h1 language='en-US' data-testid="body-title">This is a simple Page</h1>
        <h1 language='pt-BR' data-testid="body-title">Essa é uma simples página</h1>
      </template>
      
      <template type="language-group">
        <p language='en-US' data-testid="f-paragraph">This is my first paragraph.</p>
        <p language='pt-BR' data-testid="f-paragraph">Esse é o meu primeiro paragráfo.</p>
      </template>

      <template type="language-group">
        <p language='en-US' class="awesome" data-testid="s-paragraph">The is the second paragraph.</p>
        <p language='pt-BR' class="awesome" data-testid="s-paragraph">Esse é meu segundo paragráfo.</p>
      </template>

      <template type="language-group">
        <p language='en-US' id="third" class="awesome" data-testid="t-paragraph">The is the third paragraph.</p>
        <p language='pt-BR' id="third" class="awesome" data-testid="t-paragraph">Esse é meu terceiro paragráfo.</p>
      </template>
      
      <ul data-testid="list">
        <template type="language-group">
          <li language='en-US' data-testid="list-f-item">My first item</li>
          <li language='pt-BR' data-testid="list-f-item">Meu primeiro item</li>
        </template>

        <template type="language-group">
          <li language='en-US' data-testid="list-s-item">My second item</li>
          <li language='pt-BR' data-testid="list-s-item">Meu segundo item</li>
        </template>

        <template type="language-group">
          <li language='en-US' data-testid="list-s-item">My third item</li>
          <li language='pt-BR' data-testid="list-s-item">Meu terceiro item</li>
        </template>
      </ul>

      <template type="language-group">
        <ul language='en-US' data-testid="list-complete">
          <li>My first item</li>
          <li>My second item</li>
          <li>My third item</li>
        </ul>
        <ul language='pt-BR' data-testid="list-complete">
          <li>Meu primeiro item</li>
          <li>Meu segundo item</li>
          <li>Meu terceiro item</li>
        </ul>
      </template>
    </main>
  </body>
`
export {
  pageWithouContent,
  pageWithMissingContent,
  pageWithContent
}
