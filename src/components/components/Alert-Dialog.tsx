import { useState, useEffect } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { useNavigate } from 'react-router-dom';

const Dialog = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(true);  // Show dialog on mount
  }, []);

  const handleLoginRedirect = () => {
    setOpen(false);
    navigate('/login');  // Redirect to login page
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Your chat may not be saved</AlertDialogTitle>
          <AlertDialogDescription>
            You're currently not logged in. Chats made in this session may not be saved. 
            Please log in to ensure your chat history is stored securely.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Continue as Guest
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleLoginRedirect}>
            Log In
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Dialog
