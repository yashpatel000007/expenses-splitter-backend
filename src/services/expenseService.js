exports.calculateSplit = async (expense, participants) => {
    const { split_type, total_amount } = expense;
    let splits = [];
  
    if (split_type === 'EQUAL') {
      const amountPerPerson = total_amount / participants.length;
      splits = participants.map(participant => ({
        user_id: participant.user_id,
        amount_owed: amountPerPerson,
      }));
    } else if (split_type === 'EXACT') {
      splits = participants.map(participant => ({
        user_id: participant.user_id,
        amount_owed: participant.amount_owed,
      }));
    } else if (split_type === 'PERCENTAGE') {
      const totalPercentage = participants.reduce((acc, participant) => acc + participant.percentage, 0);
      if (totalPercentage !== 100) throw new Error('Percentages must add up to 100');
  
      splits = participants.map(participant => ({
        user_id: participant.user_id,
        amount_owed: (participant.percentage / 100) * total_amount,
      }));
    }
  
    return splits;
  };
  