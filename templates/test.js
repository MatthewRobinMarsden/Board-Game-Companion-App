state{
    let t1 = tile
    t1.Id = '1'
    addToBoard(t1)
    
    let t2 = tile
    t2.Id = '2'
    addToBoard(t2)
    
    let t3 = tile
    t3.Id = '3'
    addToBoard(t3)
    
    let t4 = tile
    t4.Id = '4'
    addToBoard(t4)
    
    let t5 = tile
    t5.Id = '5'
    addToBoard(t5)
    
    let t6 = tile
    t6.Id = '6'
    addToBoard(t6)
    
    let t7 = tile
    t7.Id = '7'
    addToBoard(t7)
    
    let t8 = tile
    t8.Id = '8'
    addToBoard(t8)
    
    let t9 = tile
    t9.Id = '9'
    addToBoard(t9)
    
}

player crossAI{
    action placeCross(t){
        let p = piece
        p.Id='x'
        let message = 'The ai places a cross in'+t.Id
        
        output(message)
        addPieceToTile(p,t)
        
    }
    
    condition(t){
        let ans = true
        if(t.pieces.length == 1)
        {
            ans = false
        }
        return ans
        
    }
    
    turn(){
        let c =generateChoices()
        
        chooseAction(c[0],this.params[0])
        
        
        
    }
}


player naught{
     placeNaught(t){
        let p = piece
        p.Id='o'
    
        addPieceToTile(p,t)
    }
    
    condition(t){
        let ans = true
        
        
        if(t.pieces.length == 1)
        {
            ans = false
        }
        return ans
    }
    
    turn(){
        
        let prompt = 'where will you place the naught'
        
        let ans = false
        
        do
        {
            let i =input(prompt, 'text')
            let t = getTileByID(i)
            ans = isActionLegal('placeNaught',t)
            
        }
        while(!(ans))
    }
}

endgame{
    let ans = false
    let t1 = getTileByID('1')
    let t2 = getTileByID('2')
    let t3 = getTileByID('3')
    let t3 = getTileByID('4')
    let t3 = getTileByID('5')
    let t3 = getTileByID('6')
    let t3 = getTileByID('7')
    let t3 = getTileByID('8')
    let t3 = getTileByID('9')
    
    if(t1.pieces.length == 1 && t2.pieces.length == 1 && t3.pieces.length == 1)
    {
        if(t1.pieces[0].Id == t2.pieces[0].Id == t3.pieces[0].Id)
        {
            if(t1.pieces[0].Id == 'x')
            {
                output('The ai wins')
            }
            else
            {
                output('You win')
            }
            ans = true
        }
    }
    if(t4.pieces.length == 1 && t5.pieces.length == 1 && t6.pieces.length == 1)
    {
        if(t4.pieces[0].Id == t5.pieces[0].Id == t6.pieces[0].Id)
        {
            if(t4.pieces[0].Id == 'x')
            {
                output('The ai wins')
            }
            else
            {
                output('You win')
            }
            ans = true
        }
    }
    if(t7.pieces.length == 1 && t8.pieces.length == 1 && t9.pieces.length == 1)
    {
        if(t7.pieces[0].Id == t8.pieces[0].Id == t9.pieces[0].Id)
        {
            if(t7.pieces[0].Id == 'x')
            {
                output('The ai wins')
            }
            else
            {
                output('You win')
            }
            ans = true
        }
    }

    


    if(t1.pieces.length == 1 && t4.pieces.length == 1 && t7.pieces.length == 1)
    {
        if(t1.pieces[0].Id == t4.pieces[0].Id == t7.pieces[0].Id)
        {
            if(t1.pieces[0].Id == 'x')
            {
                output('The ai wins')
            }
            else
            {
                output('You win')
            }
            ans = true
        }
    }
    if(t2.pieces.length == 1 && t5.pieces.length == 1 && t8.pieces.length == 1)
    {
        if(t2.pieces[0].Id == t5.pieces[0].Id == t8.pieces[0].Id)
        {
            if(t2.pieces[0].Id == 'x')
            {
                output('The ai wins')
            }
            else
            {
                output('You win')
            }
            ans = true
        }
    }
    if(t3.pieces.length == 1 && t6.pieces.length == 1 && t9.pieces.length == 1)
    {
        if(t3.pieces[0].Id == t6.pieces[0].Id == t9.pieces[0].Id)
        {
            if(t3.pieces[0].Id == 'x')
            {
                output('The ai wins')
            }
            else
            {
                output('You win')
            }
            ans = true
        }
    }




    if(t1.pieces.length == 1 && t5.pieces.length == 1 && t9.pieces.length == 1)
    {
        if(t1.pieces[0].Id == t5.pieces[0].Id == t9.pieces[0].Id)
        {
            if(t1.pieces[0].Id == 'x')
            {
                output('The ai wins')
            }
            else
            {
                output('You win')
            }
            ans = true
        }
    }
    if(t3.pieces.length == 1 && t5.pieces.length == 1 && t9.pieces.length == 1)
    {
        if(t3.pieces[0].Id == t5.pieces[0].Id == t9.pieces[0].Id)
        {
            if(t3.pieces[0].Id == 'x')
            {
                output('The ai wins')
            }
            else
            {
                output('You win')
            }
            ans = true
        }
    }




    if(t7.pieces.length == 1 && t8.pieces.length == 1 && t9.pieces.length == 1 && t4.pieces.length == 1 && t6.pieces.length == 1 && t5.pieces.length == 1 && t1.pieces.length == 1 && t2.pieces.length == 1 && t3.pieces.length == 1)
    {
        output('draw')
        return true;
    }
    return ans
}