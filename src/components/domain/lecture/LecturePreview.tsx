import React from 'react'
import {QueryGuard} from '../../../QueryGuard'
import {useGetLecture} from '../../../api/lecture'
import {LectureOverview} from '../../../types'
import MarkdownView from '../../core/MarkdownView'
import Modal from '../../core/Modal'
import VideoWrapper from '../video/VideoWrapper'
import styled from 'styled-components'

type Props = {
  lecture: LectureOverview
  onClosePreview: () => void
}

const LecturePreview = ({lecture, onClosePreview}: Props) => {
  const getLectureQuery = useGetLecture(lecture.id, true)

  return (
    <StyledModal onClose={onClosePreview}>
      <QueryGuard {...getLectureQuery}>
        {(lecture) => (
          <>
            {lecture.videoUrl && (
              <VideoWrapper vimeoVideoId={lecture.videoUrl} autoplay />
            )}
            {lecture.content && <MarkdownView children={lecture.content} />}
          </>
        )}
      </QueryGuard>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  max-width: 1024px;
  width: calc(100% - 80px);
  padding: 32px;
`

export default LecturePreview
