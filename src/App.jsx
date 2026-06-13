import { useState } from 'react'
import './App.css'
import axios from 'axios';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

function App() {
  const [emailContent, setEmailContent]=useState('');
  const [tone,setTone]=useState('');
  const [generatedReply,setGeneratedReply]=useState('');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  
  const handleSubmit=async()=>{
      setLoading(true);
      setError('');
      setGeneratedReply('');
      try{
        const response=await axios.post("https://email-writer-r683.onrender.com/api/email/generate",{
          emailContent,
          tone
        });
        setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
      
      
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
  };
  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant='h3' component="h1" gutterBottom> Email Reply Generator</Typography>
      </Container>
      <Box sx={{ mx: 3}}>
         <TextField 
             fullWidth
             multiline
             rows={6}
             variant='outlined'
             label="Original Email Content"
             value={emailContent || ''}
             onChange={(e)=>setEmailContent(e.target.value)}
        sx={{mb:2}} />
        <FormControl fullWidth sx={{mb:2}}>
          <InputLabel>Select Tone(Optional)</InputLabel>
          <Select
            value={tone || ''}
            label="Select Tone(Optional)"
            onChange={(e)=>setTone(e.target.value)}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Formal">Formal</MenuItem>
          <MenuItem value="Informal">Informal</MenuItem>
          <MenuItem value="Friendly">Friendly</MenuItem>

            </Select>
        </FormControl>
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={loading || !emailContent.trim()}
          fullWidth>
          {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
        </Button>
      </Box>
      {error && (
        <Box sx={{ mx: 3, mt: 2 }}>
          <Typography variant='body1' color="error">
            {error}
            </Typography>
        </Box>
      )}
      {generatedReply && (
        <Box sx={{ mx: 3, mt: 4 }}>
          <Typography variant='h5' gutterBottom>Generated Reply:</Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            value={generatedReply || ''}
            InputProps={{
              readOnly: true,
            }}
          />  

          <Button
           variant='outlined'
           sx={{ mt: 2 }}
           onClick={() => navigator.clipboard.writeText(generatedReply)}
          >
            copy to clipboard
          </Button>
        </Box>
      )}
    </>
  )
}

export default App

