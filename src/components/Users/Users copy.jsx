import React, { useState, useEffect } from 'react'

// bootstrap
import {
    Container,
    Modal,
} from 'react-bootstrap'

// users styles
import "./styles/users-styles.scss"

// modals
import CreateUserModal from './includes/modals/CreateUserModal'
import EditUserModal from './includes/modals/EditUserModal'
import EditColumnsModal from './includes/modals/EditColumnsModal'

// user table
import UserTableTopBar from './includes/UserTable/UserTableTopBar'
import UserTable from './includes/UserTable/UserTable'

// APIs
import { getUsers } from 'utlis/Apis/AdminUsers_API'

export default function Users() {
    // consts
    const loadingCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const editColumnsType = "dropdown"  // dropdown or modal

    // refs

    // states
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const [createUserModalShow, setCreateUserModalShow] = useState(false)
    const [editUserModalShow, setEditUserModalShow] = useState(false)
    const [editColumnsModalShow, setEditColumnsModalShow] = useState(false)

    const [allUsersSelected, setAllUsersSelected] = useState(false)

    const [userToBeEdit, setUserToBeEdit] = useState({})

    const [column__User, setColumn__User] = useState(true)
    const [column__Email, setColumn__Email] = useState(true)
    const [column__Type, setColumn__Type] = useState(true)
    const [column__TwoFactors, setColumn__TwoFactors] = useState(true)
    const [column__LastActive, setColumn__LastActive] = useState(true)
    const [column__Status, setColumn__Status] = useState(true)

    // useEffect: temprory filling user data
    useEffect(() => {
        setLoading(true)

        // getting users
        getUsers("7", "").then(res => {
            console.log(res)
        }).catch(err => {
            // console.log('err ', err)
            console.log('err ', err.message)
        })

        // getting users
        setTimeout(() => {
            const usersData = [
                {
                    id: "1",
                    firstName: "Rick",
                    lastName: "Grimes",
                    email: "rickgrimes@gmail.com",
                    type: "admin",
                    twoFactors: "no",
                    status: "active",
                    lastActive: new Date(2021, 5, 12)
                },
                {
                    id: "2",
                    firstName: "Ipsa",
                    lastName: "Grimes",
                    email: "ipsa@gmail.com",
                    type: "manager",
                    twoFactors: "yes",
                    status: "active",
                    lastActive: new Date(2021, 4, 12)
                },
                {
                    id: "3",
                    firstName: "Dolorum",
                    lastName: "Ran",
                    email: "doran@gmail.com",
                    type: "manager",
                    twoFactors: "no",
                    status: "active",
                    lastActive: new Date(2021, 3, 12)
                },
                {
                    id: "4",
                    firstName: "Qui",
                    lastName: "Chee",
                    email: "cheq@gmail.com",
                    type: "reporter",
                    twoFactors: "no",
                    status: "active",
                    lastActive: new Date(2021, 5, 12)
                },
                {
                    id: "5",
                    firstName: "Rerum",
                    lastName: "Nal",
                    email: "rerumnal@gmail.com",
                    type: "reporter",
                    twoFactors: "no",
                    status: "active",
                    lastActive: new Date(2021, 3, 12)
                },
                {
                    id: "6",
                    firstName: "Rick",
                    lastName: "Grimes",
                    email: "rickgrimes@gmail.com",
                    type: "admin",
                    twoFactors: "no",
                    status: "active",
                    lastActive: new Date(2021, 5, 12)
                },
                {
                    id: "7",
                    firstName: "Ipsa",
                    lastName: "Grimes",
                    email: "ipsa@gmail.com",
                    type: "manager",
                    twoFactors: "yes",
                    status: "active",
                    lastActive: new Date(2021, 2, 12)
                },
                {
                    id: "8",
                    firstName: "Dolorum",
                    lastName: "Ran",
                    email: "doran@gmail.com",
                    type: "manager",
                    twoFactors: "no",
                    status: "active",
                    lastActive: new Date(2021, 5, 12)
                },
                {
                    id: "9",
                    firstName: "Qui",
                    lastName: "Chee",
                    email: "cheq@gmail.com",
                    type: "reporter",
                    twoFactors: "no",
                    status: "active",
                    lastActive: new Date(2021, 5, 12)
                },
                {
                    id: "10",
                    firstName: "Rerum",
                    lastName: "Nal",
                    email: "rerumnal@gmail.com",
                    type: "reporter",
                    twoFactors: "no",
                    status: "inactive",
                    lastActive: new Date(2021, 5, 12)
                },
            ]
            setLoading(false)
            setUsers([])
            setUsers(usersData)
        }, 2000);

    }, [])

    // openning create user modal opening
    const handleCreateUserModalOpen = () => setCreateUserModalShow(true);

    // closing create user modal opening
    const handleCreateUserModalClose = () => setCreateUserModalShow(false);

    // openning modal edit user opening
    const handleEditUserModalOpen = (ev, user) => {
        ev.preventDefault()
        setUserToBeEdit(user)
        setEditUserModalShow(true)
    };

    // closing modal edit user opening
    const handleEditUserModalClose = () => {
        setEditUserModalShow(false)
    };

    // openning modal edit columns opening
    const handleEditColumnsModalOpen = () => {
        setEditColumnsModalShow(true)
    };

    // closing modal edit columns opening
    const handleEditColumnsModalClose = () => {
        setEditColumnsModalShow(false)
    };

    // selecting all the columns
    const handleSelectAllChange = (ev) => {
        const checkboxes = document.getElementsByClassName('user-selector-checkbox')

        // checking the checkbox and selecting all users
        setAllUsersSelected(!allUsersSelected)
        setTimeout(() => {
            if (ev.target.checked) {
                // all users selected
                checkboxes.length && Array.from(checkboxes).forEach(checkbox => {
                    checkbox.checked = true
                });
            } else {
                // all users not selected
                checkboxes.length && Array.from(checkboxes).forEach(checkbox => {
                    checkbox.checked = false
                });
            }
        }, 50);

    };

    const handleDeleteUser = (ev, userId) => {
        ev.preventDefault()

        var confirmation = window.confirm('Are you sure you want to delete this user?')

        if (confirmation) {
            alert('user width the id' + userId + ' is delete now')
        } else {

        }
    }

    return (
        <section id="app-users" className="st-def-mar-TB">
            <Container fluid className="st-container">
                <div className="app-users">
                    {/* HEADING WRAPPER */}
                    <div className="app-header-wrapper d-flex mb-2">
                        {/* heading */}
                        <p className="app-heading text-capitalize">users</p>
                    </div>

                    {/* CONTENT WRAPPER */}
                    <div className="app-content-container">
                        {/* app card */}
                        <div className="app-card">
                            <div className="app-card-content bg-white border st-border-light st-default-rounded-block">
                                {/* top bar */}
                                <div className="acc_top-bar border-bottom st-border-light">
                                    <UserTableTopBar
                                        editColumnsType={editColumnsType}

                                        handleCreateUserModalOpen={() => handleCreateUserModalOpen()}
                                        handleEditColumnsModalOpen={() => handleEditColumnsModalOpen()}

                                        column__User={column__User}
                                        column__Email={column__Email}
                                        column__Type={column__Type}
                                        column__TwoFactors={column__TwoFactors}
                                        column__LastActive={column__LastActive}
                                        column__Status={column__Status}

                                        setColumn__User={bool => setColumn__User(bool)}
                                        setColumn__Email={bool => setColumn__Email(bool)}
                                        setColumn__Type={bool => setColumn__Type(bool)}
                                        setColumn__TwoFactors={bool => setColumn__TwoFactors(bool)}
                                        setColumn__LastActive={bool => setColumn__LastActive(bool)}
                                        setColumn__Status={bool => setColumn__Status(bool)}
                                    />
                                </div>

                                {/* table */}
                                <div className="st-listing-table users-table">
                                    <UserTable
                                        allUsersSelected={allUsersSelected}
                                        handleSelectAllChange={ev => handleSelectAllChange(ev)}


                                        column__User={column__User}
                                        column__Email={column__Email}
                                        column__Type={column__Type}
                                        column__TwoFactors={column__TwoFactors}
                                        column__LastActive={column__LastActive}
                                        column__Status={column__Status}

                                        loadingCount={loadingCount}
                                        loading={loading}

                                        users={users}

                                        handleEditUserModalOpen={(ev, item) => handleEditUserModalOpen(ev, item)}
                                        handleDeleteUser={(ev, userId) => handleDeleteUser(ev, userId)}

                                    />
                                </div>
                            </div>
                        </div>

                        {/* modal | create user */}
                        <Modal
                            show={createUserModalShow}
                            onHide={handleCreateUserModalClose}
                            centered
                            // backdrop={"static"}
                            className="st-modal create-user-modal">
                            <Modal.Body>
                                {/* create user modal body */}
                                <CreateUserModal
                                    closeModal={() => handleCreateUserModalClose()}
                                />
                            </Modal.Body>
                        </Modal>

                        {/* modal | edit user */}
                        <Modal
                            show={editUserModalShow}
                            onHide={handleEditUserModalClose}
                            centered
                            // backdrop={"static"}
                            className="st-modal edit-user-modal">
                            <Modal.Body>
                                {/* edit user modal body */}
                                <EditUserModal
                                    closeModal={() => handleEditUserModalClose()}

                                    user={userToBeEdit}
                                />
                            </Modal.Body>
                        </Modal>

                        {/* modal | edit columns */}
                        <Modal
                            show={editColumnsModalShow}
                            onHide={handleEditColumnsModalClose}
                            centered
                            // backdrop={"static"}
                            className="st-modal edit-columns-modal">
                            <Modal.Body>
                                {/* edit columns modal body */}
                                <EditColumnsModal
                                    closeModal={() => handleEditColumnsModalClose()}
                                />
                            </Modal.Body>
                        </Modal>

                    </div>
                </div>
            </Container>
        </section>
    )
}
