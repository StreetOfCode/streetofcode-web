// import {CircularProgress} from '@material-ui/core'
// import React, {useState} from 'react'
// import {useGetNextCourseOptions} from '../../../api/voteNextCourse'
// import useUser from '../../../hooks/useUser'
// import {QueryGuard} from '../../../QueryGuard'
// import {VoteNextCoursesRequest} from '../../../types'
// import Button from '../../core/Button'
// import * as Api from '../../../api'
// import Flex from '../../core/Flex'
// import Text from '../../core/Text'
// import styled from 'styled-components'

// const nextCourseVotedStorageKey = 'nextCoureVoted'

// type VoteStatus = 'NOT_VOTED' | 'VOTE_JUST_SUBMITTED' | 'ALREADY_VOTED'

// const VoteNextCourse = () => {
//   const [selectedNextCourses, setSelectedNextCourses] = useState<number[]>([])
//   const {user, isLoading} = useUser()
//   const [voteStatus, setVoteStatus] = useState<VoteStatus>(() => {
//     // TODO create service for localStorage
//     if (localStorage.getItem(nextCourseVotedStorageKey) != null) {
//       return 'ALREADY_VOTED'
//     }
//     return 'NOT_VOTED'
//   },
//   )

//   const getVoteNextCourse = useGetNextCourseOptions()

//   const handleOnSelected = (nextCourseVoteId: number) => {
//     if (selectedNextCourses.includes(nextCourseVoteId)) {
//       setSelectedNextCourses(selectedNextCourses.filter((id) => id !== nextCourseVoteId))
//     } else {
//       setSelectedNextCourses(selectedNextCourses.concat([nextCourseVoteId]))
//     }
//   }

//   const handleOnSubmit = async () => {
//     if (selectedNextCourses.length === 0) return

//     const response = await Api.authPost<VoteNextCoursesRequest>(Api.voteNextUrl(), {
//       courseVoteOptionIds: selectedNextCourses,
//     })

//     if (!response.ok) {
//       // TODO handle error
//       return
//     } else {
//       if (!user) {
//         localStorage.setItem(nextCourseVotedStorageKey, 'true')
//       }

//       setVoteStatus('VOTE_JUST_SUBMITTED')
//     }
//   }

//   if (isLoading) return <CircularProgress />

//   if (voteStatus === 'VOTE_JUST_SUBMITTED') {
//     return (<Text align="center">
//       Ďakujeme, tvoj hlas bol zarátaný.
//     </Text>)
//   } else if (voteStatus === 'ALREADY_VOTED') {
//     return null
//   } else {
//     return (
//       <QueryGuard {...getVoteNextCourse}>
//         {(nextCourseOptions) => nextCourseOptions.length > 0 ? (
//           <Flex direction="column" gap="22px">
//             <Text align="center">
//               Keď chceš, aby sme spravili dáky kurz, tak zahlasuj
//               a možno (ale len možno) budeš vypočutý/á!
//             </Text>
//             <Flex gap="12px">
//               {nextCourseOptions.map((courseOption) =>
//                 (<CourseOptionButton
//                   normalWeight
//                   key={courseOption.id}
//                   onClick={() => handleOnSelected(courseOption.id)}
//                   selected={selectedNextCourses.includes(courseOption.id)}
//                 >{courseOption.name}</CourseOptionButton>),
//               )}
//             </Flex>
//             <Button
//               variant="accent"
//               onClick={handleOnSubmit}
//               disabled={selectedNextCourses.length === 0}
//             >Odoslať</Button>
//           </Flex>
//         ) : null }
//       </QueryGuard>
//     )
//   }
// }

// const CourseOptionButton = styled(Button)<{selected: boolean}>`
//   border-color: ${(props) => props.selected && props.theme.accentColor};
//   color: ${(props) => props.selected && props.theme.accentColor};

//   transition: 100ms ease-in-out;

//   &:hover {
//     transform: scale(1.1);
//     transition: 100ms ease-in-out;
//   }
// `

// export default VoteNextCourse
