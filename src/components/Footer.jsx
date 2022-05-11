import { 
  Box
} from '@mui/material'
const Footer = () => {
  return (
    <footer style={{ color: 'rgba(223, 209, 209, 1)', position: 'fixed', bottom: 0, width: '100%' }}>
      <Box textAlign='center' >
        Copyright &reg; {new Date().getFullYear()}
      </Box>
    </footer>
  )
}

export default Footer
