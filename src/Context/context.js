import React, { createContext, useState, useEffect } from 'react';

export const KanbanBoardContext = createContext()

export const KanbanBoardProvider = ({ children }) => {
    const [ticketsList, updateTicketsList] = useState([])
    const [usersList, updateUsersList] = useState([])
    const [showBox, toggleBoxVisibility] = useState(false)
    const [groupType, updateGroupType] = useState("priority")
    const [orderType, updateOrderType] = useState("priority")
    const [displayListObj, updateDisplayList] = useState({})
    const [userNamesObj, updateUsernameObj] = useState({})

    const modifyDisplayList = () => {


        let modifedListObj = {}
        localStorage.setItem("quickSell", JSON.stringify({groupType, orderType}))


        ticketsList.map(each => {
            const category = each[groupType]

            if (modifedListObj[category] === undefined) {
                modifedListObj[category] = [each]
            } else {
                modifedListObj[category].push(each)
            }

            return null
        })

        const allKeysList = Object.keys(modifedListObj)

        for (let each of allKeysList) {
            const tasks = modifedListObj[each]
            if (orderType === "priority") {
                modifedListObj[each] = tasks.sort(function (a, b) {
                    return b[orderType] - a[orderType];
                });
            }else{
                modifedListObj[each] = tasks.sort(function(a, b) {
                    return a.title.localeCompare(b.title);
                });
            }
        }

        updateDisplayList(modifedListObj)

    }

    const getTicketsAndUsersList = async () => {

        const stringfiedObj = localStorage.getItem('quickSell')
        const obj = JSON.parse(stringfiedObj)
        updateGroupType(obj.groupType)
        updateOrderType(obj.orderType)

        console.log(obj)


        const url = "https://api.quicksell.co/v1/internal/frontend-assignment"

        const response = await fetch(url)
        const responseData = await response.json()
        updateTicketsList(responseData.tickets)
        updateUsersList(responseData.users)
        let userNamesObj = responseData.users.reduce(function(result, user) {
            result[user.id] = user.name;
            return result;
        }, {});
        updateUsernameObj(userNamesObj)

        

    }

    useEffect(() => {
        getTicketsAndUsersList()

    }, [])

    useEffect(() => {
        modifyDisplayList()
    }, [ticketsList])

    useEffect(() => {
        modifyDisplayList()
    }, [groupType, orderType])



    return (
        <KanbanBoardContext.Provider value={{ usersList,userNamesObj, displayListObj, showBox, groupType, orderType, toggleBoxVisibility, updateGroupType, updateOrderType }}>
            {children}
        </KanbanBoardContext.Provider>
    );
}

