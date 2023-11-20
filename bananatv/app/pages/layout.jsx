import Nav from '@/components/Nav'
import '../../public/assets/css/Global.css'


export default function PagesLayout({ children }) {
  return (
    <section>
      <Nav/>
      {children}
    </section>
  )
}
