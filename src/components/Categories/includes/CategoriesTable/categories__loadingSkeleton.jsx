import React, { memo } from 'react'

// Skeleton loading
import Skeleton from 'react-loading-skeleton';

function categories__loadingSkeleton() {
    return (
        <tr>
            <td>
                <Skeleton count={1} height={20} width={20} />
            </td>
            <td>
                <Skeleton count={1} height={20} />
            </td>
            <td>
                <Skeleton count={1} height={60} width={60} />
            </td>
            <td>
                <Skeleton count={1} height={20} />
            </td>
            <td>
                <Skeleton count={1} height={20} />
            </td>
            <td>
                <div className="d-flex justify-content-end">
                    <div className="me-2">
                        <Skeleton
                            circle={true}
                            count={1}
                            height={20}
                            width={20} />
                    </div>
                    <div className="">
                        <Skeleton
                            circle={true}
                            count={1}
                            height={20}
                            width={20} />
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default memo(categories__loadingSkeleton)