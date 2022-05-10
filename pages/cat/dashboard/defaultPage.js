import { Button } from '@chakra-ui/react'; 

export default function FrontPage(){
    const handleLogout = async() => {

        try{
          const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
          });
  
          const data = await response.json();
  
          console.log(response.status);
  
          if(response.status < 200 || response.status > 299){
            alert(data.message);
            return;
          }
  
          console.log(data.message);
  
        }catch(error){
          alert(error?.message || "Something went wrong")
        }
      console.log("Logging Out...");
      window.location.href = '/cat/intro';
  
    }
    return(
    <>
          <Button
            as="a"
            variant="outline"
            colorScheme='teal'
            onClick={()=>handleLogout()}
            _hover={{ backgroundColor: "gray.500" }}
          >
            Logout
          </Button>
    </>
    )
}