import React, { createContext, useState, useEffect } from 'react';

export const KanbanBoardContext = createContext()

export const KanbanBoardProvider = ({ children }) => {
    const [ticketsList, updateTicketsList] = useState([])
    const [usersList, updateUsersList] = useState([])
    const [showBox, toggleBoxVisibility] = useState(false)
    const [groupType, updateGroupType] = useState("priority")
    const [orderType, updateOrderType] = useState("priority")
    const [displayList, updateDisplayList] = useState([])

    const modifyDisplayList = () => {
        let modifedListObj = {}

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
        console.log(modifedListObj)

    }

    const getTicketsAndUsersList = async () => {

        const url = "https://api.quicksell.co/v1/internal/frontend-assignment"

        const response = await fetch(url)
        const responseData = await response.json()
        updateTicketsList(responseData.tickets)
        updateUsersList(responseData.users)

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
        <KanbanBoardContext.Provider value={{ usersList, displayList, showBox, groupType, orderType, displayList, toggleBoxVisibility, updateGroupType, updateOrderType }}>
            {children}
        </KanbanBoardContext.Provider>
    );
}

