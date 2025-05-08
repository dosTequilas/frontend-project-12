import { Navbar, Container, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">{t('hexletChat')}</Navbar.Brand>
        <Button href="/" variant="primary">
          {t('exit')}
        </Button>
      </Container>
    </Navbar>
  )
}

export default Header
