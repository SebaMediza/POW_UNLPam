import '../public/assets/css/Global.css'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
      </head>
      <body className={'body'}>
        {children}
        <script src='../assets/js/auth.js'></script>
      </body>
    </html >
  )
}
