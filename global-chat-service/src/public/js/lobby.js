const room = document.getElementById('room');

//Get All Module Options Passed to It
module_chats.forEach(element => {
    const option = document.createElement('option');
    option.text = element;
        
        option.value = element;
        room.add(option);
    });
