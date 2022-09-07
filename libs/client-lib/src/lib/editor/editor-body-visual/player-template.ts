import { Component, Input} from "@angular/core";

@Component({
    selector: 'board-game-companion-app-player-template',
    styleUrls:['./editor-body-visual.component.scss'],
    template: `
        <div id = "player" class = "boardContainers">
            <details open>
                <summary class = "list-none flex flex-wrap items-center cursor-pointer">
                    <div class = "title text-2xl font-bold ml-4 mt-2 mb-4">
                        Player <input> 
                    </div>
                    <button *ngIf="Players.length > 2" (click)="removePlayer()" id = "removePlayer"><i class="fa-solid fa-circle-xmark"></i></button>
                </summary>
                <button (click)="addAction()" id = "addAction">Add Action</button>
                <div class = "ActionConditionPairs" *ngFor = "item of Actions let i = index">
                    <div id = "action" class = "playerContainers">
                        <details open>
                            <summary class = "list-none flex flex-wrap items-center cursor-pointer">
                                <div class = "title text-xl font-bold ml-4 mt-2">
                                    Action <input> <input>
                                </div>
                                <button *ngIf="Actions.length > 1" (click)="removeAction(i)" id = "removeAction"><i class="fa-solid fa-circle-xmark"></i></button>
                            </summary>
                            <board-game-companion-app-element-template class="wrapper" dragula="COPYABLE" [(dragulaModel)]="Actions[i]" [dest] = "Actions[i]" [dests] = "PlayerLoops" [methods] = "methods"></board-game-companion-app-element-template>
                        </details>
                    </div>
                    <div id = "condition" class = "playerContainers">
                        <details open>
                            <summary class = "list-none flex flex-wrap items-center cursor-pointer">
                                <div class = "title text-xl font-bold ml-4 mt-2">
                                    Condition <input>
                                </div>
                            </summary>
                            <board-game-companion-app-element-template class="wrapper" dragula="COPYABLE" [(dragulaModel)]="Conditions[i]" [dest] = "Conditions[i]" [dests] = "PlayerLoops" [methods] = "methods"></board-game-companion-app-element-template>
                        </details>
                    </div>
                </div>
                <div id = "turn" class = "playerContainers">
                    <details open>
                        <summary class = "list-none flex flex-wrap items-center cursor-pointer">
                            <div class = "title text-xl font-bold ml-4 mt-2">
                                Turn
                            </div>
                        </summary>
                        <board-game-companion-app-element-template class="wrapper" dragula="COPYABLE" [(dragulaModel)]="Turn[0]" [dest] = "Turn[0]" [dests] = "PlayerLoops" [methods] = "methods"></board-game-companion-app-element-template>
                    </details>
                </div>
            </details>
        </div>
    `
})

export class PlayerTemplateComponent{
    @Input() Actions = [[{title: '', class: '' , id: '', pos: 0}]] 
    @Input() Conditions = [[{title: '', class: '' , id: '', pos: 0}]]
    @Input() Turn = [[{title: '', class: '' , id: '', pos: 0}]]  
    @Input() PlayerLoops = [[{title: '', class: '' , id: '', pos: 0}]]
    @Input() Players = [{actions: [[{title: '', class: '' , id: '', pos: 0}]], conditions: [[{title: '', class: '' , id: '', pos: 0}]], turn: [[{title: '', class: '' , id: '', pos: 0}]]},{actions: [[{title: '', class: '' , id: '', pos: 0}]], conditions: [[{title: '', class: '' , id: '', pos: 0}]], turn: [[{title: '', class: '' , id: '', pos: 0}]]}]
    @Input() Index = 0
    @Input() methods = [
        {name: 'addToBoard', arguments: 1},
        {name: 'addPieceToTile', arguments: 2},
        {name: 'addToArr', arguments: 2}
      ]

    addAction(){
        this.Actions.push([{title: '', class: '' , id: '', pos: 0}])
        this.Conditions.push([{title: '', class: '' , id: '', pos: 0}])
    }

    removeAction(i: number)
    {
        this.Actions.splice(i, 1)
        this.Conditions.splice(i,1)
    }

    removePlayer()
    {
        this.Players.splice(this.Index, 1)
    }
    
}