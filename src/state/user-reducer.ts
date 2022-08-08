type StateType = {
   age: number
   childrenCount: number
   name: string
}
type ActionType = {
   type: string
   [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
   switch (action.type) {
      case "INCREMENT-AGE":
         let mewState = {...state}

         mewState.age = state.age + 1
         return mewState
      case "INCREMENT-CHILDREN-COUNT":

         return {
            ...state,
            childrenCount: state.childrenCount + 1
         }
      case "CHANGE-NAME":
         return {
            ...state,
            name: action.newName
         }
      default:
         throw new Error("i dont understading this action type")
   }
}