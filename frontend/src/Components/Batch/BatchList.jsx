import React, { useEffect, useState } from "react";
import { Box,Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch } from '@mui/material';
import axios from "../../axios";
import EditBatch from "./EditBatch";
import AddBatch from "./AddBatch";

import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';

function BatchList () {

    const [ batchList, setBatchList ] = useState([])
    const [ existingBatch, setExistingBatch ] = useState(null)
    const [ openDialog, setOpenDialog ] = useState(false)
    const [ isBatchAdded,setIsBatchAdded ] = useState(false)

    useEffect(() => {
        axios.get('api/view/batch-list')
        .then((response) => {
            setBatchList(response.data)
            console.log(response.data)
        }).catch((error) => console.log(error) )
    }, [isBatchAdded])

    const handleEdit = (id) => {
      const existingBatch = batchList.find((batch) => batch.id === id)
      setExistingBatch(existingBatch)
      // axios.patch(`api/edit/batch/${id}`)
        console.log(`Edit button clicked for ID: ${id}`);
    };

    const handleAddBatch = () => {
      console.log('add batch on batch list triggered')
      setIsBatchAdded(false)
      setOpenDialog(true)
    }

    const handleBatchAdded = () => {
      setIsBatchAdded(true)
      // setOpenDialog(false)
    }

    const handleEditBatchSubmit = (newName) => {
      axios.patch(`api/edit/batch/${existingBatch.id}`, {
        batch_num : newName,
      }).then(() => {
        setBatchList((prevBatchList) => 
        prevBatchList.map((batch) => 
        batch.id === existingBatch.id ? {...batch, batch_num: newName}: batch))
      })
      setExistingBatch(null)
    }

    const handleSwitchChange = (id,isActive) => {
      axios.patch(`api/edit/batch/${id}`, {
        is_active: isActive,
      })
      .then( () => {
        setBatchList((prevBatchList) => 
        prevBatchList.map((batch) => 
        batch.id === id ? {...batch, is_active: isActive } : batch ))
      })
    }

    const handleDelete = (id) => {
        axios.delete(`api/delete/batch/${id}`).then(() => {
          setBatchList((prevBatchList) =>
          prevBatchList.filter((batch) => batch.id !== id)
        );
        })
        console.log(`Delete button clicked for ID: ${id}`);
    };



    return (
    
        <Box sx={{ 
          backgroundColor : '#5584B0',
          height: '100vh', 
          display:'flex', 
          justifyContent:'center',
          // alignItems:'center'
          flexDirection:'column',
          alignItems:'center',

          // justifyContent:'flex-start',
          }}>
          <Box>
            <Button sx={{
              display: 'flex',
              justifyContent:'flex-start',
              width: '100px',
              marginTop:'5rem',
              backgroundColor : '#81C2E6',
              color:'black',
              '&:hover':{ boxShadow : '03px 03px 6px rgba(0, 0, 0, 0.6)', backgroundColor: '#81C2E6' }
              }}
              onClick={handleAddBatch}
              >
              Add Batch
            </Button>
          </Box>
        
        <TableContainer 
        component={Paper}
        sx={{ backgroundColor: '#5a5a5a', maxWidth: '50%', marginTop:'1rem' }}
        >
          
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#E5E1E1' }}>Sl No</TableCell>
            <TableCell sx={{ color: '#E5E1E1' }}>Batch Name</TableCell>
            <TableCell sx={{ color: '#E5E1E1' }} />
          </TableRow>
        </TableHead>
        <TableBody>
      
          {batchList.map((list,index) => (
            <TableRow key={list.id}>
              <TableCell sx={{ color: '#E5E1E1' }}>{index+1}</TableCell>
              <TableCell sx={{ color: '#E5E1E1' }}>{list.batch_num}</TableCell>
              <TableCell>
                <Button  color='primary' onClick={() => handleEdit(list.id)}>
                  <BorderColorTwoToneIcon/>
                </Button>
                 <span style={{ marginLeft: '5px' }} />
                {/* <Button color='error' onClick={() => handleDelete(list.id)}>
                  <DeleteOutlineTwoToneIcon />
                </Button> */}
                <Switch 
                // disabled={!list.is_active} 
                checked={list.is_active} 
                onChange={ () => handleSwitchChange(list.id, !list.is_active) }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            
      {existingBatch && ( <EditBatch 
      open={Boolean(existingBatch)} 
      onClose={() => setExistingBatch(null)}
      batchName={existingBatch.batch_num}
      onSubmit = {handleEditBatchSubmit}
      />)}

      {openDialog && <AddBatch setOpenDialog = {setOpenDialog} onBatchAdded = {handleBatchAdded} />}
        </Box>
        
    )
}

 export default BatchList