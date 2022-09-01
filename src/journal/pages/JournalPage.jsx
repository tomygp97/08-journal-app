import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material";

export const JournalPage = () => {
  return (

    <JournalLayout>

      {/* <Typography>Deserunt aliquip enim dolore veniam do. Aliqua magna culpa sunt ipsum duis labore anim dolor sit elit veniam aliqua fugiat nisi. Minim veniam deserunt commodo commodo sunt.</Typography> */}

      <NothingSelectedView />

      {/* <NoteView /> */}

      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50
        }}  
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>

    </JournalLayout>

  )
}
